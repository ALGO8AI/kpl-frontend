import React from "react";
import Home from "../Home/Home";
import LayoutView from "../layoutView/LayoutView";
import Setting from "../setting/Setting";
import VideoWall from "../videoWall/VideoWall";
import ViolationDetails from "../violationDetails/ViolationDetails";
import ViolationLog from "../violationLog/ViolationLog";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";

function Stitching(props) {
  const pages = {
    home: <Home />,
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    layoutView: <LayoutView />,
    yourData: <YourData />,
    violationDetails: <ViolationDetails id={props.match.params.id} />,
  };

  const page = pages[props.match.params.page];
  return (
    <>
      {/* <StitchingProvider> */}
      <Navigation />
      {page}
      {/* </StitchingProvider> */}
    </>
  );
}

export default Stitching;
