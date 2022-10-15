# React Table Component With Infinite Scroll Support


## Functional Requirements

  - The table is able load new items
  - The table's columns is able to be sorted in 'asc' | 'desc' mode by default, otherwise should provided `onFilter` function should be called with 'asc' | 'desc' argument.
  - The table is able to select items (select all) and remove selected ones. Then it should call `onRemoveItems` function if it's provided with removed items. 

## API

```javascript
  <CustomTable
    headers: Array<{
                    dataIndex: string,
                    title: string,
                    width: number,
                    sorter: true | false
             }>
    data: Array<{}>
    onScroll: Function
    onItemClick: (item: Object) => any
    onFilter: (mode: 'asc' | 'desc', field: string) => any
    onRemoveItems: (items: Array<Object>) => any,
    selectAll: (boolean)
  />
```
- `data` - the provided data (array of objects). Each key in object should be in the `dataIndex` field in the `headers`
- `headers` - the list of table columns (array of objects). Each of them should be an object with following fields
  - `dataIndex` - the way to find an item from `data`
  - `sorter` - depends on value the column should be able to be sorted in 'asc' | 'desc' mode
- `onScroll` - adds new items if not provided, otherwise should call provided function
- `onItemClick` - calls a function with info about selected item
- `onFilter` - sorts items in 'asc' | 'desc' mode if not provided, otherwise should call provided function. Also, it says which column has been sorted.
- `selectAll` - shows `Select All` button or not

## Usage

The table called with following props: 

```javascript
  const headers = [
      {
              dataIndex: 'name',
              title: 'Name',
              width: 120,
              sorter: false,
      },
      {
              dataIndex: 'rate',
              title: 'Rating',
              width: 120,
              sorter: true,
      }
    ]
  const data = [
    {
      name: 'React',
      rate: 120,
      id: 1,
    }, 
    {
      name: 'Vue',
      rate: 130,
      id: 2
    }
  ]
  
  <CustomTable
    headers={headers}
    data={data}
    onItemClick={(item) => console.log(item)}
    onRemoveItems={(items) => console.log(items)}
    selectAll={true}
    onScroll={() => console.log('scrolled')}
  />
```
