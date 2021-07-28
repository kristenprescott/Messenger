import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

import Navbar from "../Components/Navbar";
import Loading from "../assets/images/loading.gif";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    # Req:
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      # Res:
      username
      email
      createdAt
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push("/login"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegistrationForm = (e) => {
    e.preventDefault();

    registerUser({ variables });

    // Clear input fields:
    setVariables({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <Navbar />
      <Row className="Register">
        <Col className="Column" sm={11} md={10} lg={9}>
          <Card className="card">
            <h1 className="text-center ">Register</h1>

            <hr />

            {loading ? (
              <img alt="loading..." src={Loading} width="25%" />
            ) : (
              <Form onSubmit={submitRegistrationForm}>
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
                    className={errors.email && "text-danger"}
                    style={{ fontSize: "1.6rem" }}
                  >
                    {errors.email ?? "Email "}
                  </Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    type="email"
                    value={variables.email}
                    onChange={(e) =>
                      setVariables({ ...variables, email: e.target.value })
                    }
                    className={errors.email && "is-invalid formField"}
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

                <Form.Group className="formGroup">
                  <Form.Label
                    className={errors.confirmPassword && "text-danger"}
                    style={{ fontSize: "1.6rem" }}
                  >
                    {errors.confirmPassword ?? "Confirm password "}
                  </Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    type="password"
                    value={variables.confirmPassword}
                    onChange={(e) =>
                      setVariables({
                        ...variables,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={errors.confirmPassword && "is-invalid formField"}
                  />
                </Form.Group>

                <div className="d-grid btn-wrapper">
                  <Button
                    type="submit"
                    className="register-btn btn"
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
                    Already have an account?{" "}
                    <Link to="/login">
                      <h1 style={{ fontSize: "3.2rem" }}>Login!</h1>
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
