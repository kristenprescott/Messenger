import React, { useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Card, Image } from "react-bootstrap";

import { useMessageDispatch, useMessageState } from "../Context/message";

import Loading from "../assets/images/loading.gif";

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

export default function Messages() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((u) => u.selected === true);
  const messages = selectedUser?.messages;

  const [
    getMessages,
    { loading: messagesLoading, data: messagesData },
  ] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a friend.</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = (
      <Image alt="loading..." src={Loading} width="300px" height="300px" />
    );
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => (
      <div key={message.uuid} style={{ width: "100%", textAlign: "left" }}>
        <p>{message.content}</p>
        <hr />
      </div>
    ));
  } else if (messages.length === 0) {
    selectedChatMarkup = (
      <p>You are now connected - send your first message!</p>
    );
  }

  return (
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
      <hr />

      <div className="messagesdata">{selectedChatMarkup}</div>
    </Card>
  );
}
