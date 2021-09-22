import React from "react";
import { Link } from "react-router-dom";
import box from '../img/box.png'

import { Container } from "reactstrap";

export default function HomeLoggedOut() {
  return (
    <Container>
      <div className="px-4 py-5 my-5 text-center">
        
        <div className="card col-sm-4 offset-4 shadow border-0 bg-light ">
       
        <div className="card-body d-grid gap-2">
        <h3 className="card-title">Welcome To Craftory</h3>
        <img src={box} className="card-img-top mb-3" alt="Box logo"/>
        
          <Link to="/signup" className="btn btn-block btn-primary">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
