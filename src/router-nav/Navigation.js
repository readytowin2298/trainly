import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Nav, Navbar, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function Navigation({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);
  function loggedInNav() {
    return (
        <>
            <Nav.Link href="#"><button onClick={logout}>Logout</button> </Nav.Link>
        </>
    );
  }

  function loggedOutNav() {
    return (
        <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="#signup">Signup</Nav.Link>
        </>
    );
  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">Train.ly</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/assignments">My Assignments</Nav.Link>
                { currentUser ? loggedInNav() : loggedOutNav() }
            
            </Nav>
        </Container>
    </Navbar>
  );
}

export default Navigation;
