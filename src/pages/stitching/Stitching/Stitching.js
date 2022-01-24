import React from "react";
import Analytics from "../Analytics/Analytics";
import Home from "../Home/Home";
import { ViewDetails } from "../layoutView/viewDetails/viewDetails";
import Setting from "../setting/Setting";
import ViolationLog from "../violationLog/ViolationLog";
import YourData from "../yourData/YourData";
import Navigation from "./Navigation";
import { Annotation } from "../layoutView/annotation/Annotation";
import ViolationDetail from "../violationDetails/ViolationDetail";
// import LiveMachine from "../liveMachine/LiveMachine";
import VideoWall from "../videoWall/VideoWall";
import ComingSoon from "../layoutView/ComingSoon";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

function Stitching(props) {
  const pages = {
    home: <Home />,
    violationLog: <ViolationLog />,
    videoWall: <VideoWall />,
    // videoWall: <LiveMachine />,
    setting: <Setting />,
    viewdetails: <ViewDetails />,
    layoutView: <ComingSoon />,
    // layoutView: <LayoutView path="view" />,
    annotation: <Annotation />,
    yourData: <YourData />,
    violationDetails: <ViolationDetail id={props.match.params.id} />,
    analytics: <Analytics />,
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
      <div className="Stitching_Container">
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
      </div>
      {/* <CLPCTRDialog2 open={state?.CTRDialog} handleCloseCTR={handleCloseCTR} /> */}

      {/* </StitchingProvider> */}
    </>
  );
}

export default Stitching;
