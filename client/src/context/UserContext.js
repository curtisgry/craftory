import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
const context = createContext(null);

const useGetUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [session, setSession] = useState(null)

  // useEffect(()=> {
  //   axios.get(`${baseUrl}/session`)
  //   .then(res => {
  //     setSession(res)
  //   })
  // }, [])

  useEffect(() => {
  if(!loggedInUser){
    axios
      .get(`${baseUrl}/user`, {withCredentials: true})
      .then((res) => {
        console.log(res.data)
        setLoggedInUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoggedInUser(false);
      });
  }
  }, [loading]);

  console.log(loggedInUser)
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
