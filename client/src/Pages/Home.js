import { Image, Card } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

import { useAuthDispatch } from "../Context/auth";
import Navbar from "../Components/Navbar";

import Loading from "../assets/images/loading.gif";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
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
      <div
        key={user.username}
        className="usernames"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          padding: ".5rem",
        }}
      >
        <Image
          alt="avatar"
          src={user.imageUrl}
          roundedCircle
          className="mr-2"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "0px 0px 0px 10px",
          }}
        >
          <p
            className="m-0"
            style={{ fontSize: "1.6rem", fontWeight: "bolder" }}
          >
            {user.username && user.username}
          </p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected."}
          </p>
        </div>
      </div>
    ));
  }

  return (
    <div className="App">
      <Navbar logout={logout} />

      <div className="Home">
        <Card
          style={{
            width: "50%",
            height: "82vh",
            margin: ".5rem 1rem 0px 1.5rem",
            textAlign: "center",
            borderRadius: "9px",
            boxShadow: "5px 5px 6px rgba(0,0,0,0.6)",
          }}
        >
          <h3
            style={{
              fontSize: "3.6rem",
              fontWeight: "bolder",
              marginTop: "2rem",
            }}
          >
            Users online:
          </h3>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {usersMarkup}
          </div>
        </Card>

        <Card
          style={{
            width: "50%",
            height: "82vh",
            margin: ".5rem 1.5rem 0px 1rem",
            textAlign: "center",
            borderRadius: "9px",
            boxShadow: "5px 5px 6px rgba(0,0,0,0.6)",
          }}
        >
          <h3
            style={{
              fontSize: "3.6rem",
              fontWeight: "bolder",
              marginTop: "2rem",
            }}
          >
            Messages:
          </h3>
          <hr style={{ color: "darkgray", margin: "2.5rem" }} />

          <div style={{ padding: "1rem 2rem", fontSize: "1.8rem" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </Card>
      </div>
    </div>
  );
}
