import React, { useContext } from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import { Container } from "reactstrap";

import { UserProvider } from "../context/UserContext";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";

export default function Home({ update, toggleUpdate }) {
  const [userCompanies, setUserCompanies] = useState(null);

  const { user } = useContext(UserProvider.context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      const res = await axios.get("/nav");
      setLoading(false)
      const { companies } = res.data;
      if (companies) {
        setUserCompanies([...companies]);
        setLoading(false)
      }
    })();
  }, [update]);


  return (
    <>
    {loading ? <h3>Loading..</h3> : 
      <Container>
      {user ? (
        <HomeLoggedIn
          companies={userCompanies}
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
