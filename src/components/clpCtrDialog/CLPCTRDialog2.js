/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {
  closeCTR,
  getCurrentCTR,
  getUnassignedCLPCTR,
  updateCTR,
} from "../../services/api.service";
import "./CLPCTRDialog.scss";

function CLPCTRDialog2({ open, handleCloseCTR }) {
  const [CTR, setCTR] = React.useState({
    id: "",
    CtrNo: "",
    startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
    startDate: new Date().toISOString().slice(0, 10),
    oldCtr: "",
    oldCtrId: "",
  });
  const [CLP, setOldCLP] = React.useState("");
  const [CTRresp, setCTRresp] = React.useState("");
  const [currentCTR, setCurrentCTR] = React.useState([]);
  const [unassignedCTR, setUnassignedCTR] = React.useState([]);

  const ChangeCTR = async () => {
    try {
      var txt = window.confirm("CTR will be changed, Do you want to proceed ?");
      if (txt) {
        const resp = await updateCTR(CTR);
        // console.log(resp);
        setCTRresp(resp.msg);
        handleCloseCTR();
        setCTR({
          id: "",
          CtrNo: "",
          startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
          startDate: new Date().toISOString().slice(0, 10),
          oldCtr: "",
          oldCtrId: "",
        });
        alert("CTR changed successfully");
        loadCurrentAndUnassigned();
        window.location.reload();
      }
    } catch (err) {}
  };

  //   const loadData = async () => {
  //     try {
  //       const ctr = await ctrDropDown();
  //       setCtrDrop(ctr);
  //       setCTR({
  //         ...CTR,
  //         currentCtr: ctr?.currentCLPCTR[0]?.clpCtr,
  //         wing: ctr?.data[0]?.wing,
  //         clpctr: ctr?.data[0]?.clpCtr,
  //         resourceId: ctr?.data[0]?.resourceId,
  //         line: "U+2",
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  const loadCurrentAndUnassigned = async () => {
    try {
      const curr = await getCurrentCTR();
      console.log(curr?.data);
      setCurrentCTR(curr?.data);
      setCTR({
        ...CTR,
        oldCtr: curr?.data[0]?.CtrNo,
        oldCtrId: curr?.data[0]?.id,
      });
      setOldCLP(curr?.data[0]?.Clp);
      localStorage.setItem("Current_CTR", curr?.data[0]?.CtrNo || "N/A");
      console.log(curr?.data[0]?.CtrNo || "N/A");
      const unassign = await getUnassignedCLPCTR();
      console.log(unassign?.data);
      setUnassignedCTR(unassign?.data);
    } catch (e) {}
  };

  const setNewCtr = (e, t) => {
    const current = unassignedCTR.findIndex((item) => item?.CtrNo === t?.CtrNo);
    setCTR({
      ...CTR,
      CtrNo: unassignedCTR[current]?.CtrNo,
      id: unassignedCTR[current]?.id,
    });
  };

  const fetchCloseCTR = async () => {
    try {
      const resp = await closeCTR({ id: CTR.oldCtrId, CtrNo: CTR.oldCtr });
      console.log(resp);
      setCTRresp(resp.msg);
      handleCloseCTR();
      loadCurrentAndUnassigned();
    } catch (e) {}
  };

  React.useEffect(() => {
    // loadData();
    loadCurrentAndUnassigned();
  }, []);
  return (
    <div className="CLP-Dialog">
      <Dialog
        open={open}
        onClose={handleCloseCTR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: "100%", display: "flex" }}>
          <h2 style={{ padding: "12px", margin: "auto" }}>Change CTR</h2>
          <Button
            onClick={() => {
              handleCloseCTR();
              console.log(CTR);
            }}
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </Button>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} style={{ width: "320px" }}>
              <Grid item xs={12}>
                {CTR.oldCtr && (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="time"
                    label="Current CTR"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={CLP + "-" + CTR.oldCtr}
                    disabled
                  />
                )}
              </Grid>

              {unassignedCTR?.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={unassignedCTR}
                      getOptionLabel={(option) =>
                        `${option.Clp}-${option.CtrNo}`
                      }
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="New CTR"
                          variant="outlined"
                          //   value={CTR.CtrNo}
                        />
                      )}
                      //   value={CTR.CtrNo}
                      onChange={(e, t) => setNewCtr(e, t)}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="time"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={CTR.startDate}
                  onChange={(e) =>
                    setCTR({ ...CTR, startDate: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="time"
                  label="Start Time"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  defaultValue={CTR.startTime}
                  // value={CTR.startTime}
                  onChange={(e) =>
                    setCTR({ ...CTR, startTime: e.target.value })
                  }
                />
              </Grid>
              <Grid xs={12}>
                <p style={{ color: "#F68F1D", textAlign: "center" }}>
                  {CTRresp}
                </p>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchCloseCTR}
            style={{
              border: "1px solid #0e4a7b",
            }}
          >
            Close CTR
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              ChangeCTR();
            }}
            color="primary"
            autoFocus
          >
            Start Next CTR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CLPCTRDialog2;
