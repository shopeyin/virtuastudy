import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
function Navigation() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Link to="/">Home</Link>
        <div onClick={() => auth.signOut()}>Signout</div>
      </Container>
    </Navbar>
  );
}

export default Navigation;
