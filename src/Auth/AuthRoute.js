import React from "react";
import { Route, Redirect } from "react-router-dom";
import { KPLContext } from "../context/ViolationContext";

function AuthRoute({ component, authed, ...rest }) {
  // const { state } = React.useContext(KPLContext);
  console.log(authed);
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
