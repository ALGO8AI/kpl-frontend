/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component, authed, ...rest }) {
  const Component = component;
  // state
  const [state, setState] = React.useState(localStorage.getItem("KPL Auth"));

  return (
    <Route
      {...rest}
      render={(props) =>
        state ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AuthRoute;
