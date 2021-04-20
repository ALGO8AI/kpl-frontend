import React from "react";
import { Route, Redirect } from "react-router-dom";
import { KPLContext } from "../context/ViolationContext";

function AuthRoute({ component, authed, ...rest }) {
  // const { state } = React.useContext(KPLContext);
  console.log(authed);
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props) =>
        !Boolean(authed) ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AuthRoute;
