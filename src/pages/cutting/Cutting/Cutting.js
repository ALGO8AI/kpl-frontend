import React from "react";
import { LayoutView } from "../../stitching/layoutView/LayoutView";
// import Setting from "../../stitching/setting/Setting";
import DefectDetails from "../DefectDetails/DefectDetails";
import Defects from "../DefectDetails/Defects";
import Feedback from "../Feedback/Feedback";
// import DefectDetails fro../DefectDetails/Defectsils";
import Home from "../Home/Home";
import LiveDefect from "../LiveDefect/LiveDefect";
import Setting from "../Setting/Setting";
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
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
    liveDefect: <LiveDefect />,
    // violationDetails: <ViolationDetail id={props.match.params.id} />,
    // analytics: <Analytics />,
  };

  const page = pages[props.match.params.page];

  // selector
  const { open, status, message } = useSelector((state) => state?.Common);

  // dispatch
  const dispatch = useDispatch();

  return (
    <>
      {/* <StitchingProvider> */}
      <Navigation />
      <div className="Stitching_Container">{page}</div>
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
      {/* </StitchingProvider> */}
    </>
  );
}

export default Cutting;
