import './App.css';
import CustomTable from './CustomTable/CustomTable';
import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(data.concat(json)))
      .finally(() => setLoading(false));
  }


  const headers = [
    {
      dataIndex: "name",
      title: "Name",
      width: 120,
      sorter: true
    },
    {
      dataIndex: "email",
      title: "Email",
      width: 120,
      sorter: false
    },
    {
      dataIndex: "username",
      title: "Username",
      width: 120,
      sorter: true
    }
  ];


  if(loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App" >
          <CustomTable
            headers={headers}
            data={data}
            onItemClick={(item) => console.log(item)}
            onFilter={() => ({ mode: 'asc', field: 'name' })}
            onRemoveItems={(deletedItems) => console.log(deletedItems)}
            selectAll={true}
            // onScroll={() => console.log('scrolled')}
          />
    </div>
  );
}

export default App;
