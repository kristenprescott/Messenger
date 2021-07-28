import { Col /*, Row*/ } from "react-bootstrap";
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
    <img alt="loading..." src={Loading} width="300px" height="300px" />;
  } else if (data.getUsers.length === 0) {
    <p>No one is online.</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div key={user.username}>
        <ul style={{ textAlign: "left" }}>
          <li>{user.username}</li>
        </ul>
      </div>
    ));
  }

  return (
    <div className="">
      <Navbar logout={logout} />

      <div className="Home">
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid white",
              margin: "3rem",
              padding: "4rem",
            }}
          >
            <h3 style={{ fontSize: "3.6rem", fontWeight: "bolder" }}>
              Users online:
            </h3>
            <hr style={{ color: "floralwhite" }}></hr>
            {usersMarkup}
          </div>
        </Col>
        <Col
          xs={6}
          className="messages-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="chat-messages"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid white",
              margin: "1rem 2rem",
              padding: "5rem 7rem",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                fontSize: "3.6rem",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Messages:
            </h3>
            <hr style={{ color: "floralwhite", width: "200px" }}></hr>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </Col>
      </div>
    </div>
  );
}
