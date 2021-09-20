import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const context = createContext(null);

const useGetLists = () => {
  const [list, setList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  useEffect(() => {
    console.log('THE LIST,',list)
      if(loadingList){ 
    axios.get("/userdata")
     .then(res => {
      const { companies } = res.data;
      if (companies) {
        setList([...companies]);
      }
      setLoadingList(false)
     })
    }
  }, [loadingList, setLoadingList])

  return { list, loadingList, setLoadingList };
};

const UserListProvider = ({ children }) => {
  const { list, loadingList, setLoadingList } = useGetLists();

  return (
    <context.Provider value={{ list: list, loadingList, setLoadingList }}>
      {children}
    </context.Provider>
  );
};

UserListProvider.context = context;
export { UserListProvider };
