import { useEffect, useState } from "react";
import { Image, Card } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

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

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export default function Home({ history }) {
  const dispatch = useAuthDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);

  if (messagesData) console.log("Msg: ", messagesData.getMessages);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  const { loading, data, error } = useQuery(GET_USERS);

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
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          alt="avatar"
          src={user.imageUrl}
          roundedCircle
          className="avatarImg mr-2"
        />

        <div className="usermessages">
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
        <Card className="Card Left">
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

        <Card className="Card Right">
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

          <div className="messagesdata">
            {messagesData && messagesData.getMessages.length > 0 ? (
              messagesData.getMessages.map((message) => (
                <div
                  key={message.uuid}
                  style={{ width: "100%", textAlign: "left" }}
                >
                  <p>{message.content}</p>
                  <hr style={{ color: "gray" }} />
                </div>
              ))
            ) : (
              <div>
                <p>Messages...</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
