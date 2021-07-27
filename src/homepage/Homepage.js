import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";


function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Train.ly</h1>
          <p className="lead">Knowledge and fun, together as one.</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.name || currentUser.email}!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold m-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold m-3"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Homepage;
