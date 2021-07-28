import { Col, Row } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

import { useAuthDispatch } from "../Context/auth";
import Navbar from "../Components/Navbar";

import Loading from "../assets/images/loading.gif";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
    }
  }
`;

export default function Home({ history }) {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  const { loading, data, error } = useQuery(GET_USERS);

  if (error) {
    console.log("ERROR: ", error);
  }
  if (data) {
    console.log("DATA: ", data);
  }

  let usersMarkup;
  if (!data || loading) {
    // usersMarkup = <p>Loading...</p>;
    <img alt="loading..." src={Loading} width="300px" height="300px" />;
  } else if (data.getUsers.length === 0) {
    <p>No one is online.</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div key={user.username}>
        <p>{user.username}</p>
      </div>
    ));
  }

  return (
    <div className="">
      {/* <div className="half"> */}
      {/* <Row> */}
      <Navbar logout={logout} />
      {/* <div className=""> */}
      {/* <h1
            style={{
              fontSize: "4.2rem",
              fontWeight: "900",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Homepage
          </h1> */}
      {/* </div> */}
      {/* </Row> */}
      {/* </div> */}

      <div className="Home">
        {/* <Row> */}
        <Col
          xs={8}
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="usernames"
            style={{
              border: "1px solid white",
              margin: "1rem",
              padding: "5rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "3.6rem", fontWeight: "bolder" }}>
              Users online:{" "}
            </h3>
            {usersMarkup}
          </div>
        </Col>
        <Col
          xs={8}
          className="messages-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="messages"
            style={{
              border: "1px solid white",
              margin: "5rem",
              padding: "10rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "3.6rem", fontWeight: "bolder" }}>
              {" "}
              Messages:{" "}
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </Col>
        {/* </Row> */}
      </div>
    </div>
  );
}
