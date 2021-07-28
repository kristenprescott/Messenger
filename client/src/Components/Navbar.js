import { Link } from "react-router-dom";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

import transparentLogo from "../assets/images/logo_transparent.png";

export default function Navbar({ ...props }) {
  return (
    <div className="Navbar">
      <Nav
        justify
        fill
        // variant="tabs"
        defaultActiveKey="/"
        className="Nav justify-content-center"
      >
        <Nav.Item className="NavItem">
          <img
            alt="logo"
            src={transparentLogo}
            width="120px"
            height="120px"
            className="logo"
          />
        </Nav.Item>

        <Nav.Item className="NavItem">
          <div className="nav-link">
            <Link to="/">
              <h3>Home</h3>
            </Link>
          </div>
        </Nav.Item>

        <Nav.Item className="NavItem">
          <div className="nav-link" onClick={props.logout}>
            <Link to="/">
              <h3 style={{ cursor: "pointer" }}>Logout</h3>
            </Link>
          </div>
        </Nav.Item>

        <Nav.Item className="NavItem">
          <div className="nav-link">
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          </div>
        </Nav.Item>

        {/* <Nav.Item className="NavItem">
          <div className="nav-link">
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </div>
        </Nav.Item> */}

        <Nav.Item className="NavItem">
          <Form className="Searchbar justify-content-end">
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
        </Nav.Item>
      </Nav>
    </div>
  );
}
