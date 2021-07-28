import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";

function Navigation() {
  const history = useHistory();
  const routeChange = () => {
    history.push("/");
  };
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Link to="/">Home</Link>
        <div
          onClick={() => {
            auth.signOut();
            routeChange();
          }}
          
        >
          Signout
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigation;
