import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const context = createContext(null);

const useGetUser = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/user", { withCredentials: true })
      .then((res) => {
        setLoggedInUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoggedInUser(false);
      });
  }, []);

  return { loggedInUser, loading };
};

const UserProvider = ({ children }) => {
  const { loggedInUser, loading } = useGetUser();

  return (
    <context.Provider value={{ user: loggedInUser, loading }}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;
export { UserProvider, useGetUser };
