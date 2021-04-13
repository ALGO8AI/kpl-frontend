import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stitching from "./pages/stitching/Stitching/Stitching";
import { KPLContext } from "./context/ViolationContext";
import AuthRoute from "./Auth/AuthRoute";
import Checking from "./pages/checking/Checking/Checking";

function App(props) {
  const { state, dispatch } = useContext(KPLContext);
  useEffect(() => {
    const ROLE = localStorage.getItem("ROLE");
    ROLE && dispatch({ type: "ADD_ROLE", payload: ROLE });

    const DESIGNATION = localStorage.getItem("DESIGNATION");
    DESIGNATION && dispatch({ type: "ADD_DESIGNATION", payload: DESIGNATION });

    const PROFILE = localStorage.getItem("PROFILE");
    PROFILE && dispatch({ type: "ADD_PROFILE", payload: JSON.parse(PROFILE) });
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
            <Route exact path="/checking/:page" component={Checking} />
            <Route exact path="/checking/:page/:id" component={Checking} />
            <Redirect from="/stitching" to="/stitching/home" />
            <Redirect from="/checking" to="/checking/home" />
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
