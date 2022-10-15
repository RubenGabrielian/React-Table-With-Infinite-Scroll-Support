import React, { useEffect, useState } from "react";
import styles from "../CustomTable.module.css";
import { Constants } from "../Constants";
import TableTh from "./Th";
import TableTr from "./Tr";
import InfiniteScroll from "react-infinite-scroll-component";

const CustomTable = ({
    headers,
    data,
    onFilter,
    onRemoveItems,
    selectAll,
    onItemClick,
    onScroll
}) => {

    const [filterMode, setFilterMode] = useState(onFilter ? onFilter().mode : '');
    const [filterField, setFilterField] = useState(onFilter ? onFilter().field : '');
    const [localData, setLocalData] = useState(data);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        if (onScroll) {
            onScroll();
            setLoading(false);
        } else {
            setLocalData(localData.concat(data));
        }
    }

    useEffect(() => {
        if (filterMode && filterField) {
            let sortedData = [];
            if (filterMode === Constants.asc) {
                sortedData = [...localData].sort((a, b) => (a[filterField] < b[filterField] ? -1 : 1))
            } else if (filterMode === Constants.desc) {
                sortedData = [...localData].sort((a, b) => (a[filterField] > b[filterField] ? -1 : 1))
            }
            setLocalData(sortedData);
        }
    }, [filterMode, filterField, data]);


    const handleSort = (fieldName) => {
        const filterModeCheck = filterMode === Constants.asc ? Constants.desc : Constants.asc;
        setFilterField(fieldName);
        setFilterMode(filterModeCheck);
        onFilter(filterModeCheck, fieldName);
    }

    const handleSelectAll = () => {
        const selectedAllData = localData.map((data) => ({ ...data, isChecked: !data.isChecked }));
        setLocalData(selectedAllData);
    }

    const handleSelectItem = (data) => {
        const filteredItems = localData.map((dataItem) => {
            if (dataItem.id === data.id) {
                return data;
            }
            return dataItem;
        });

        setLocalData(filteredItems);
    }

    const handleDelete = () => {
        const deletedItems = localData.filter((dataItem) => dataItem.isChecked);
        onRemoveItems(deletedItems);

        const remainedItems = localData.filter((dataItem) => !dataItem.isChecked);
        setLocalData(remainedItems);
    }

    const itemIsChecked = () => {
        const isCheckedCount = localData.filter((data) => (data.isChecked)).length;
        return !(!isCheckedCount || isCheckedCount === localData.length);
    }



    return (
        <>
            <div id="App" className={styles.customTable}>
                <InfiniteScroll
                    dataLength={localData.length}
                    next={fetchData}
                    hasMore={!!localData.length}
                    loader={loading ? <h2>Loading...</h2> : null}
                    scrollableTarget="App"
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <table className={styles.customTable}>
                        <thead>
                            <tr className={styles.customTableTr}>
                                <th className={styles.customTableTh}>Select All</th>
                                {headers ? headers.map((header, key) =>
                                    <TableTh
                                        key={key}
                                        header={header}
                                        handleSort={handleSort}
                                    />
                                ) : null}
                            </tr>
                        </thead>
                        <tbody>
                            {localData ? localData.map((dataItem, key) => {
                                return (
                                    <TableTr
                                        key={key}
                                        dataItem={dataItem}
                                        deleteCheckboxChange={onRemoveItems}
                                        headers={headers}
                                        handleSelectItem={handleSelectItem}
                                        onItemClick={onItemClick}
                                    />

                                )
                            }) : null}

                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>
            <div style={{ display: "flex" }}>
                {
                    selectAll && (
                        <button
                            onClick={() => handleSelectAll()}
                            className={styles.selectAll}
                            disabled={itemIsChecked()}
                        >
                            <span>Select All</span>
                        </button>
                    )
                }
                <button onClick={handleDelete} className={styles.removeBtn}>Delete</button>
            </div>
        </>
    )
}

export default CustomTable;