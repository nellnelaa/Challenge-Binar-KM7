
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const NavigationBar = () => {
    useEffect(() => {
        const token = localStorage.getItem("token");

        getProfile(token);
    }, []);

    const getProfile = async (token) => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/profile`, 
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );

    const result = await response.json();
    if(result.success) {
        console.log(result.data);
        return;
    }
    alert(result.data);
    };

  return (
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Student Wakanda Appp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavigationBar;