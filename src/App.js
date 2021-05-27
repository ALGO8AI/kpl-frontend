import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import React, { useContext, useEffect } from "react";

import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Stitching from "./pages/stitching/Stitching/Stitching";
import { KPLContext } from "./context/ViolationContext";
import AuthRoute from "./Auth/AuthRoute";
import Checking from "./pages/checking/Checking/Checking";
import SignUp from "./pages/SignUp";
import Blank from "./pages/Blank";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App(props) {
  // console.log(props);
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
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forget-password" component={ForgetPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />

        <AuthRoute exact path="/menu" component={Menu} />
        <AuthRoute exact path="/stitching/:page" component={Stitching} />
        <AuthRoute exact path="/stitching/:page/:id" component={Stitching} />
        <AuthRoute exact path="/checking/:page" component={Checking} />
        <AuthRoute exact path="/checking/:page/:id" component={Checking} />
        <Redirect from="/stitching" to="/stitching/home" />
        <Redirect from="/checking" to="/checking/home" />
      </Switch>
    </Router>
  );
}

export default App;
