import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Image } from "react-bootstrap";
import classNames from "classnames";

import { useMessageDispatch, useMessageState } from "../Context/message";

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

export default function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true)?.username;

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => dispatch({ type: "SET_USERS", payload: users }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    <Image alt="loading..." src={Loading} width="300px" height="300px" />;
  } else if (users.length === 0) {
    <p>No one is online.</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => {
      const selected = selectedUser.username === user.username;
      return (
        <div
          role="button"
          key={user.username}
          className={classNames("usernames", { "bg-white": selected })}
          onClick={() =>
            dispatch({ type: "SET_SELECTED_USER", payload: user.username })
          }
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
      );
    });
  }

  return (
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
      <hr />
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
  );
}
