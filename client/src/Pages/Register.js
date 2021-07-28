import { useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

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

export default function Register() {
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, res) {
      // console.log("client registerUser res: ", res);
    },
    onError(err) {
      // console.log("client ERROR: ", err.graphQLErrors[0].extensions.errors);

      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const submitRegistrationForm = (e) => {
    e.preventDefault();

    // console.log("client Registration data: ", variables);

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
    <Row className="Register">
      <Col className="Column" sm={11} md={10} lg={9}>
        <Card className="card">
          <h1 className="text-center ">Register</h1>

          <hr />

          {loading ? (
            <img alt="loading..." src={Loading} width="99%" />
          ) : (
            <Form onSubmit={submitRegistrationForm}>
              <Form.Group className="formGroup">
                <Form.Label className={errors.username && "text-danger"}>
                  {errors.username ?? "Username "}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={variables.username}
                  onChange={(e) =>
                    setVariables({ ...variables, username: e.target.value })
                  }
                  className={errors.username && "is-invalid formField"}
                />
              </Form.Group>

              <Form.Group className="formGroup">
                <Form.Label className={errors.email && "text-danger"}>
                  {errors.email ?? "Email "}
                </Form.Label>
                <Form.Control
                  type="email"
                  value={variables.email}
                  onChange={(e) =>
                    setVariables({ ...variables, email: e.target.value })
                  }
                  className={errors.email && "is-invalid formField"}
                />
              </Form.Group>

              <Form.Group className="formGroup">
                <Form.Label className={errors.password && "text-danger"}>
                  {errors.password ?? "Password "}
                </Form.Label>
                <Form.Control
                  type="password"
                  value={variables.password}
                  onChange={(e) =>
                    setVariables({ ...variables, password: e.target.value })
                  }
                  className={errors.password && "is-invalid formField"}
                />
              </Form.Group>

              <Form.Group className="formGroup">
                <Form.Label className={errors.confirmPassword && "text-danger"}>
                  {errors.confirmPassword ?? "Confirm password "}
                </Form.Label>
                <Form.Control
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
            </Form>
          )}
        </Card>
      </Col>
    </Row>
  );
}
