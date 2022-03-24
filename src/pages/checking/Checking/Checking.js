import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import BagID from "../BagID/BagID";
import BagID2 from "../BagID/BagID2";
import Feedback from "../feedback/Feedback";
import Home from "../Home/Home";
import HomeV2 from "../Home/HomeV2";
import LayoutView from "../layoutView/LayoutView";
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationDetail from "../violationDetails/ViolationDetail";
import ViolationLog from "../violationLog/ViolationLog";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";

function Checking(props) {
  const pages = {
    home: <Home />,
    home2: <HomeV2 />,
    logs: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    layoutView: <LayoutView />,
    yourData: <YourData />,
    violationDetails: <ViolationDetail id={props.match.params.id} />,
    bagID: <BagID2 />,
    feedback: <Feedback />,
    // print: <BarCodePrint />,
  };

  // selector
  const { open, status, message } = useSelector((state) => state?.Common);

  // dispatch
  const dispatch = useDispatch();

  const page = pages[props.match.params.page];
  return (
    <>
      <Navigation />
      {page}
      <Snackbar open={open} autoHideDuration={4000}>
        <Alert
          onClose={() =>
            dispatch({
              type: "CLOSE_SNACK",
            })
          }
          severity={status}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Checking;
