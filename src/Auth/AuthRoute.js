/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ component, authed, ...rest }) {
  // const { state } = React.useContext(KPLContext);
  // console.log(authed);
  const Component = component;
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
