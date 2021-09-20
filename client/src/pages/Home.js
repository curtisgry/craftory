import React, { useContext } from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import { Container } from "reactstrap";

import { UserProvider } from "../context/UserContext";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";
import { UserListProvider } from "../context/UserListsContext";

export default function Home({ update, toggleUpdate }) {

  const { user, loading, setLoading } = useContext(UserProvider.context);
  
  const {setLoadingList} = useContext(UserListProvider.context)


  useEffect(() => {
    
     
      setLoading(false)
      setLoadingList(true)
    
  }, [loading, setLoading]);

 
  return (
    <>
    {loading ? <h3>Loading..</h3> : 
      <Container>
      {user ? (
        <HomeLoggedIn
          update={update}
          toggleUpdate={toggleUpdate}
        />
      ) : (
        <HomeLoggedOut />
      )}
    </Container>
    }
    
    </>
  );
}
