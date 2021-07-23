import React from "react";
import BagID from "../BagID/BagID";
import BagID2 from "../BagID/BagID2";
import Feedback from "../feedback/Feedback";
import Home from "../Home/Home";
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
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    layoutView: <LayoutView />,
    yourData: <YourData />,
    violationDetails: <ViolationDetail id={props.match.params.id} />,
    bagID: <BagID2 />,
    feedback: <Feedback />,
    // print: <BarCodePrint />,
  };

  const page = pages[props.match.params.page];
  return (
    <>
      <Navigation />
      {page}
    </>
  );
}

export default Checking;
