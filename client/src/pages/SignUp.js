import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserProvider } from "../context/UserContext";

export default function About() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useContext(UserProvider.context);
  const history = useHistory()

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }



  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email,
      username,
      password,
    };
    
    await axios.post("/register", data);
    setLoading(true)
    history.push('/')
 
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
  
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3">Welcome!</h1>
          <p className="col-lg-10 fs-4">
            Craftory is an easy way to keep track of your inventory for making
            things. Great for a hobby or a small businness.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg-light validated-form"
            noValidate
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={handleEmail}
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Username"
                onChange={handleUsername}
                required
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={handlePassword}
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign up
            </button>
            <hr className="my-4" />
          </form>
        </div>
      </div>
    </div>
  );
}
