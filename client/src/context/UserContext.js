import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const context = createContext(null);


const useGetUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
      
    axios
      .get('/user', { withCredentials: true })
      .then((res) => {
          console.log(res.data)
        setLoggedInUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoggedInUser(false);
      });
   
  }, [loading]);

  return { loggedInUser, loading, setLoading };
};

const UserProvider = ({ children }) => {
  const { loggedInUser, loading, setLoading } = useGetUser();

  return (
    <context.Provider value={{ user: loggedInUser, loading, setLoading }}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;
export { UserProvider };
