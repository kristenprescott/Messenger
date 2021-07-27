// https://www.apollographql.com/docs/react/get-started/
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  //   useQuery,
  //   gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
  return (
    <>
      <Provider client={client} {...props} />
    </>
  );
}
