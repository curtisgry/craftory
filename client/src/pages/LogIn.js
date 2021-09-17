import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { useGetUser } from "../context/UserContext";

export default function LogIn({ toggleUpdate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function redirectAfterLogIn() {
    if (redirect) {
      return <Redirect to="/" />;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    
    await axios.post("/login", data);
    setRedirect(true);
    window.location.reload(false);
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      {redirectAfterLogIn()}
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Sign In</h1>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg-light"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Log In
            </button>
            <hr className="my-4" />
          </form>
        </div>
      </div>
    </div>
  );
}
