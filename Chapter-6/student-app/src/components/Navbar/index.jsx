import { Link, useNavigate } from "@tanstack/react-router";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Dropdown } from "react-bootstrap";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      // fetch get profile
      const result = await profile();
      if (result.success) {
        // set the user state here
        dispatch(setUser(result.data));
        return;
      }

      // If not success
      // delete the local storage here
      dispatch(setUser(null));
      dispatch(setToken(null));

      // redirect to login
      navigate({ to: "/login" });
    };

    if (token) {
      // hit api auth get profile and pass the token to the function
      getProfile();
    } 
    if (!token) {
      navigate({ to: "/login" });
    }
  }, [dispatch, navigate, token]);

  const logout = (event) => {
    event.preventDefault();

    // delete the local storage here
    dispatch(setUser(null));
    dispatch(setToken(null));

    // redirect to login
    navigate({ to: "/login" });
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/public/images/logo.png" alt="" width="80" height="32" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user ? (
              <>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>

                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="d-flex align-items-center"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Image
                      src={user?.profile_picture}
                      roundedCircle
                      width="30"
                      height="30"
                      alt="User Profile"
                      className="me-2"
                    />
                    {user?.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                {/* <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link> */}
                {/* <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link> */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
