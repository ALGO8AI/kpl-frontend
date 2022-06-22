import {
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import * as Styles from "./Login.module.scss";
import logo from "../images/kpl-logo.png";
import { Alert } from "@material-ui/lab";
import { login } from "../services/api.service";
import { Link, useHistory } from "react-router-dom";
import { KPLContext } from "../context/ViolationContext";
import Blank from "./Blank";
import { useDispatch } from "react-redux";

const ColorButton = withStyles(() => ({
  root: {
    color: "white",
    backgroundColor: "#0e4a7b",
    "&:hover": {
      backgroundColor: "#0e4a7b",
    },
  },
}))(Button);

function Login() {
  // Variables
  const history = useHistory();

  // states
  const [user, setUser] = useState({
    userId: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("");

  const { dispatch } = React.useContext(KPLContext);
  const Dispatch = useDispatch();

  // Snackbar close function
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // login function
  const submit = async () => {
    try {
      await login(user.userId, user.password).then((x) => {
        if (x) {
          console.log(x);
          if (x.msg) {
            if (x.msg.status === 201) {
              localStorage.setItem("KPL Auth", true);
              dispatch({ type: "ADD_ROLE", payload: x.data.role });
              Dispatch({ type: "ADD_ROLE", payload: x.data.role });
              localStorage.setItem("ROLE", x.data.role);
              dispatch({
                type: "ADD_DESIGNATION",
                payload: x.data.designation,
              });
              dispatch({
                type: "ADD_PROFILE",
                payload: x.data,
              });
              localStorage.setItem("DESIGNATION", x.data.designation);
              localStorage.setItem("PROFILE", JSON.stringify(x.data));
              localStorage.setItem("kpl_username", x.data.username);
              localStorage.setItem("kpl_wing", x.data.wing);
              localStorage.setItem("kpl_line", x.data.zone);

              history.push("/menu");
            } else {
              setMsg(`An error occured! Error code:${x.msg.status}`);
              setOpen(true);
            }
          } else {
            if (x.status === 204) {
              setMsg("Invalid Credentials!");
              setOpen(true);
            } else {
              setMsg(`An error occured! Error code:${x.status}`);
              setOpen(true);
            }
          }
        } else {
          setMsg("Network Issue!");
          setOpen(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Blank />

      <div elevation={5} className={Styles.LoginContainer}>
        <Paper className={Styles.LoginBox} elevation={5}>
          <div className={Styles.left}></div>
          <div className={Styles.right}>
            <div className={Styles.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div className={Styles.form}>
              <h3>Welcome to</h3>
              <h2>iVision</h2>
              <TextField
                label="User ID"
                variant="outlined"
                name="userId"
                className={Styles.text}
                onChange={(e) => setUser({ ...user, userId: e.target.value })}
              />
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                className={Styles.text}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <Typography
                component={Link}
                to="/forget-password"
                style={{
                  margin: "12px 0",
                  textDecoration: "none",
                  color: "black",
                  textAlign: "end",
                }}
                variant="body1"
              >
                <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
                  Forget Password
                </span>
              </Typography>
              <ColorButton variant="contained" onClick={submit}>
                LOG IN
              </ColorButton>
              <Typography
                component={Link}
                to="/signup"
                style={{
                  margin: "12px 0",
                  textDecoration: "none",
                  color: "black",
                }}
                variant="h6"
              >
                Don't have an account,{" "}
                <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
                  Sign Up
                </span>
              </Typography>
            </div>
          </div>
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {msg}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default Login;
