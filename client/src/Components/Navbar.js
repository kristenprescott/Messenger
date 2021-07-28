import { Link } from "react-router-dom";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

import transLogo from "../assets/images/logo_transparent.png";

export default function Navbar() {
  return (
    <div className="Navbar">
      <Nav fill variant="" defaultActiveKey="/" className="Nav">
        <Nav.Item
          style={{
            margin: "0px 2.5rem",
            padding: "0px 5rem",
            paddingRight: ".1rem",
          }}
        >
          {/* <Nav.Link href="/"> */}
          {/* <Link to="/"> */}
          <img
            alt="logo"
            src={transLogo}
            width="120px"
            height="120px"
            className="logo"
            style={{ borderRadius: "9px", margin: "0px", padding: "0px" }}
          />
          {/* </Link> */}
          {/* </Nav.Link> */}
        </Nav.Item>

        <Nav.Item
          style={{
            margin: "0px 2.5rem",
            padding: "0px 5rem",
            paddingLeft: ".1rem",
          }}
        >
          <Nav.Link href="/">
            <Link to="/">
              <h3>Messenger</h3>
            </Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={{ margin: "0px 2.5rem", padding: "0px 5rem" }}>
          <Nav.Link eventKey="login">
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item style={{ margin: "0px 2.5rem", padding: "0px 5rem" }}>
          <Nav.Link eventKey="register">
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </Nav.Link>
        </Nav.Item>

        <Form className="Searchbar">
          <FormControl
            type="search"
            placeholder="Search"
            className="search"
            aria-label="Search"
          />
          <Button variant="outline" className="btn search-btn">
            Search
          </Button>
        </Form>
      </Nav>
    </div>
  );
}
