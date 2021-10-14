import React from "react";
import { LayoutView } from "../../stitching/layoutView/LayoutView";
import Setting from "../../stitching/setting/Setting";
import DefectDetails from "../DefectDetails/DefectDetails";
import Defects from "../DefectDetails/Defects";
import DefectTable from "../DefectDetails/DefectTable";
import Feedback from "../Feedback/Feedback";
// import DefectDetails fro../DefectDetails/Defectsils";
import Home from "../Home/Home";
import VideoWall from "../VideoWall/VideoWall";
import YourData from "../YourData/YourData";

// import { LayoutView } from "../layoutView/LayoutView";
// import { ViewDetails } from "../layoutView/viewDetails/viewDetails";
// import Setting from "../setting/Setting";
// import VideoWall from "../videoWall/VideoWall";
// import ViolationLog from "../violationLog/ViolationLog";
// import YourData from "../yourData/YourData";
import Navigation from "./Navigation";
// import { Annotation } from "../layoutView/annotation/Annotation";
// import ViolationDetail from "../violationDetails/ViolationDetail";

function Cutting(props) {
  const pages = {
    // home: <Home />,
    home: <Home />,
    videoWall: <VideoWall />,
    setting: <Setting />,
    defect: <Defects />,
    violationDetails: <DefectDetails id={props.match.params.id} />,
    layoutView: <LayoutView path="view" />,
    feedback: <Feedback />,
    // annotation: <Annotation />,
    yourData: <YourData />,
    // violationDetails: <ViolationDetail id={props.match.params.id} />,
    // analytics: <Analytics />,
  };

  const page = pages[props.match.params.page];
  return (
    <>
      {/* <StitchingProvider> */}
      <Navigation />
      <div className="Stitching_Container">{page}</div>
      {/* </StitchingProvider> */}
    </>
  );
}

export default Cutting;
