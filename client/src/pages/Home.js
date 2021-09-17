import React, { useContext } from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import { Container } from "reactstrap";

import { UserProvider } from "../context/UserContext";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeLoggedOut from "./HomeLoggedOut";

export default function Home({ update, toggleUpdate }) {
  const [userCompanies, setUserCompanies] = useState(null);

  const { user, loading } = useContext(UserProvider.context);

  const [loadToggle, setLoadToggle] = useState(false);

  useEffect(() => {
    (async function fetchData() {
      const res = await axios.get("/nav");
      const { companies } = res.data;
      if (companies) {
        setUserCompanies([...companies]);
      }
    })();
  }, [update]);

  useEffect(() => {
    console.log(user);
  }, [loading]);

  return (
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
  );
}
