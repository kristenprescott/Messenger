import { useState } from "react";
import { Button, Card, Row, Col, Form } from "react-bootstrap";

export default function Register({ props }) {
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitRegistrationForm = (e) => {
    e.preventDefault();

    console.log(variables);

    // setVariables({
    //   username: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    // });
  };

  return (
    <Row className="Register">
      <Col className="" sm={11} md={10} lg={9}>
        <Card className="card">
          <h1 className="text-center ">Register</h1>

          <hr />

          <Form onSubmit={submitRegistrationForm}>
            <Form.Group className="formGroup">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                value={variables.username}
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
                className="formField"
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                value={variables.email}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
                }
                className="formField"
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                value={variables.password}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
                className="formField"
              />
            </Form.Group>

            <Form.Group className="formGroup">
              <Form.Label>Confirm Password: </Form.Label>
              <Form.Control
                type="password"
                value={variables.confirmPassword}
                onChange={(e) =>
                  setVariables({
                    ...variables,
                    confirmPassword: e.target.value,
                  })
                }
                className="formField"
              />
            </Form.Group>

            <div className="d-grid btn-wrapper">
              <Button
                type="submit"
                className="register-btn btn"
                variant="outline"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
