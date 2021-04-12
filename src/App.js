import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import React, { useContext, useState } from "react";

import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stitching from "./pages/stitching/Stitching/Stitching";
import { KPLContext } from "./context/ViolationContext";
import AuthRoute from "./Auth/AuthRoute";

function App(props) {
  const { state, dispatch } = React.useContext(KPLContext);
  React.useEffect(() => {
    const ROLE = localStorage.getItem("ROLE");
    ROLE && dispatch({ type: "ADD_ROLE", payload: ROLE });

    const DESIGNATION = localStorage.getItem("DESIGNATION");

    DESIGNATION && dispatch({ type: "ADD_DESIGNATION", payload: DESIGNATION });

    // if (state.role) {
    //   history.push("/menu");
    // } else {
    //   history.push("/");
    // }

    // console.log(state);
  }, []);
  return (
    <Router>
      <Switch>
        {Boolean(state.role) ? (
          <>
            <Route exact path="/" component={Menu} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/stitching/:page" component={Stitching} />
            <Route exact path="/stitching/:page/:id" component={Stitching} />
            <Redirect exact from="/stitching" to="/stitching/home" />
          </>
        ) : (
          <>
            <Route to="/" exact component={Login} />
            <Redirect exact to="/" />
          </>
        )}

        {/* <Redirect from="/checking" to="/checking/home" /> */}
        {/* <Route path="/checking/:page" exact component={Checking} />
        <Route path="/checking/:page/:id" exact component={Checking} /> */}
        {/* <Redirect from="/cutting" to="/cutting/home" /> */}
      </Switch>
    </Router>
  );
}

export default App;
