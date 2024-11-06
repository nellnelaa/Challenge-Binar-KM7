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
    <>
      <Row className="vh-100">
        <Col
          md={9}
          className="d-flex align-items-center justify-content-center p-0"
        >
          <img
            src="/public/images/image2.png"
            alt="Pict"
            style={{ width: "100%", height:"80%" }}
          />
        </Col>
        <Col
          md={3}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="login-page">
            <div>
              <img
                src="/public/images/logo.png"
                alt=""
                width="90"
                height="32"
              />
              <h3> 
                <b>Welcome, Admin BCR</b>
              </h3>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Contoh: johndee@gmail.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="password">
                <Form.Label column sm={3}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="6+ karakter"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Sign In
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}
