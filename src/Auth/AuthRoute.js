import React from "react";
import { Route, Redirect } from "react-router-dom";
import { KPLContext } from "../context/ViolationContext";

function AuthRoute({ component: Component, ...rest }) {
  const { state } = React.useContext(KPLContext);
  console.log(Boolean(state.role));

  return (
    <Route
      {...rest}
      render={(props) =>
        Boolean(state.role) ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AuthRoute;
