import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();
const orgGuid = '31de2868-f982-4037-a40b-49aa82295f66';

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(
      `/services/test/people/organisation/${orgGuid}/detailed/`
    );
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
}

export default DataContext;
