import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { login } from "../service/auth";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // get token from local storage
    if (token) {
      navigate({ to: "/" });
    }
  }, [navigate, token]);

  const onSubmit = async (event) => {
    event.preventDefault();

    /* hit the login API */
    // define the request body
    const body = {
      email,
      password,
    };

    // hit the login API with the data
    const result = await login(body);
    if (result.success) {
      // set token to global state
      dispatch(setToken(result.data.token));

      // redirect to home
      navigate({ to: "/" });
      return;
    }

    alert(result.message);
  };

  return (
    <Row className="">
      <Col md={8} className="d-flex align-items-center justify-content-center">
        <img
          src="/src/assets/images/image2.png"
          alt="Logo"
          style={{ width: "127%", height: "100%" }}
        />
      </Col>
      <Col md={4}>
        <div className="offset-md-3">
          <Form onSubmit={onSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="email">
              <Form.Label column sm={3}>
                Email
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="password">
              <Form.Label column sm={3}>
                Password
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Col>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" variant="primary">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
