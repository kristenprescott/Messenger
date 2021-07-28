import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { gql, useLazyQuery } from "@apollo/client";

import { useAuthDispatch } from "../Context/auth";
import Navbar from "../Components/Navbar";
import Loading from "../assets/images/loading.gif";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    # Req:
    login(username: $username, password: $password) {
      # Res:
      username
      email
      token
      createdAt
    }
  }
`;

export default function Login(props) {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useAuthDispatch();

  // useLazyQuery: executing queries manually.
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      dispatch({ type: "LOGIN", payload: data.login });

      // Redirect to Home after login
      props.history.push("/");
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });

    setIsLoggedIn(true);

    // Clear input fields:
    setVariables({
      username: "",
      password: "",
    });
  };
  console.log("Logged in? ", isLoggedIn);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Row className="Login">
        <Col className="Column" sm={11} md={10} lg={9}>
          <Card className="card">
            <h1 className="text-center">Login</h1>

            <hr />

            {loading ? (
              <img alt="loading..." src={Loading} width="25%" />
            ) : (
              <Form onSubmit={submitLoginForm}>
                <Form.Group className="formGroup">
                  <Form.Label
                    className={errors.username && "text-danger"}
                    style={{ fontSize: "1.6rem" }}
                  >
                    {errors.username ?? "Username "}
                  </Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    type="text"
                    value={variables.username}
                    onChange={(e) =>
                      setVariables({ ...variables, username: e.target.value })
                    }
                    className={errors.username && "is-invalid formField"}
                  />
                </Form.Group>

                <Form.Group className="formGroup">
                  <Form.Label
                    className={errors.password && "text-danger"}
                    style={{ fontSize: "1.6rem" }}
                  >
                    {errors.password ?? "Password "}
                  </Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    type="password"
                    value={variables.password}
                    onChange={(e) =>
                      setVariables({ ...variables, password: e.target.value })
                    }
                    className={errors.password && "is-invalid formField"}
                  />
                </Form.Group>

                <div className="btn-wrapper">
                  <Button
                    type="submit"
                    className="login-btn btn"
                    variant="outline"
                    disabled={loading}
                  >
                    Submit
                  </Button>
                </div>
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    paddingTop: "0px",
                    paddingBottom: "5rem",
                  }}
                >
                  <small>
                    Don't have an account yet?{" "}
                    <Link to="/register">
                      <h1 style={{ fontSize: "3.2rem" }}>Register!</h1>
                    </Link>
                  </small>
                </div>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
}
