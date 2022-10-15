import styles from "../CustomTable.module.css";

const TableTr = ({ dataItem, headers, handleSelectItem, onItemClick }) => {

    return (
        <tr onClick={() => onItemClick(dataItem)} className={styles.customTableTr} style={{ background: dataItem.isChecked ? "#858585" : '' }} >
            <td className={styles.customTableTd} >
                <input checked={dataItem.isChecked} type="checkbox" onChange={(e) => handleSelectItem({
                    ...dataItem, isChecked: e.target.checked
                })} />
            </td>
            {
                headers.map((header, key) => {
                    return (
                        <td className={styles.customTableTd} key={key}>{dataItem[header.dataIndex]}</td>
                    )
                })
            }

        </tr>

    )
}

export default TableTr;