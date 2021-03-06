import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserProvider } from "../context/UserContext";
import { baseUrl } from "../utils/baseUrl";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const { setLoading } = useContext(UserProvider.context);

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function closeAlert() {
    setMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      await axios.post(`${baseUrl}/login`, data, {withCredentials: true});
      setMessage("Welcome back!");
      setLoading(true);
      history.push("/");
    } catch (e) {
      if (e) {
        setMessage("Invalid username or password.");
      }
    }
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      {message.length ? (
        <div
          class="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            onClick={closeAlert}
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}

      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold lh-1 mb-3">Sign In</h1>
        </div>
        <div className="col mx-auto col-lg-5">
          <form
            onSubmit={handleSubmit}
            className="p-4 p-md-5 border rounded-3 bg-light shadow"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`
                form-control 
                ${
                  message === "Invalid username or password."
                    ? "is-invalid"
                    : ""
                }
                ${message === "Welcome back!" ? "is-valid" : ""}
                `}
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
                className={`
                form-control 
                ${
                  message === "Invalid username or password."
                    ? "is-invalid"
                    : ""
                }
                ${message === "Welcome back!" ? "is-valid" : ""}
                `}
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
