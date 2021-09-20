import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserProvider } from "../context/UserContext";
import { baseUrl } from "../utils/baseUrl";

export default function About() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setLoading } = useContext(UserProvider.context);
  const history = useHistory();

  function handleEmail(e) {
    setEmail(e.target.value);
  }
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
    if (!email || username.length < 3 || password.length < 8) {
      return setMessage(
        "All fields required. Username must be 3 or more characters. Password must be 8 or more."
      );
    }

    const data = {
      email,
      username,
      password,
    };

    try {
      await axios.post(`${baseUrl}/register`, data);
      setMessage("Welcome!");
      setLoading(true);
      history.push("/");
    } catch (e) {
      if (e.response.status === 500) {
        setMessage("Email already registered.");
      }
    }
  }

  return (
    <div className="container col-xl-10 col-xxl-8 px-4 py-5">
      {message.length ? (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            onClick={closeAlert}
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : (
        ""
      )}
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
                className={`
                form-control 
                ${!email && message.length ? "is-invalid" : ""}
                ${email ? "is-valid" : ""}
                `}
                id="floatingInput1"
                placeholder="name@example.com"
                onChange={handleEmail}
                required
              />
              <label htmlFor="floatingInput1">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`
                form-control 
                ${!username && message.length ? "is-invalid" : ""}
                ${username ? "is-valid" : ""}
                `}
                id="floatingInput2"
                placeholder="Username"
                onChange={handleUsername}
                required
              />
              <label htmlFor="floatingInput2">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className={`
                form-control 
                ${!password && message.length ? "is-invalid" : ""}
                ${password ? "is-valid" : ""}
                `}
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
