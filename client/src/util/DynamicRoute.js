import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthState } from "../Context/auth";

export default function DynamicRoute(props) {
  const { user } = useAuthState();

  // Check for user to render dynamically
  if (props.authenticated && !user) {
    return <Redirect to="/login" />;
  } else if (props.guest && user) {
    return <Redirect to="/" />;
  } else {
    return <Route component={props.component} {...props} />;
  }
}
