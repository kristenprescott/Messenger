import { Link } from "react-router-dom";
import { Nav, Form, FormControl, Button } from "react-bootstrap";

import { useAuthDispatch } from "../Context/auth";

import transparentLogo from "../assets/images/logo_transparent.png";

export default function Navbar({ history }) {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    // TODO: figure out what's up w this history here
    // history.push("/login");
    window.open("/", "_self");
  };

  return (
    <div className="Navbar">
      <Nav fill defaultActiveKey="/" className="Nav">
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
          <div className="nav-link">
            <Link to="/login">
              <h3>Login</h3>
            </Link>
          </div>
        </Nav.Item>

        <Nav.Item className="NavItem">
          <div className="nav-link" onClick={logout}>
            <Link to="/login">
              <h3 style={{ cursor: "pointer" }}>Logout</h3>
            </Link>
          </div>
        </Nav.Item>

        <Nav.Item className="NavItem">
          <div className="nav-link">
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </div>
        </Nav.Item>

        <Nav.Item className="NavItem">
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
        </Nav.Item>
      </Nav>
    </div>
  );
}
