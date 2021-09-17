import React from "react";
import { Link } from "react-router-dom";

import { Container } from "reactstrap";

export default function HomeLoggedOut() {
  return (
    <Container>
      <div className="px-4 py-5 my-5 text-center">
        <h1>Welcome To Craftory</h1>
        <div class="btn-group" role="group" aria-label="Basic example">
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
        </div>
      </div>
    </Container>
  );
}
