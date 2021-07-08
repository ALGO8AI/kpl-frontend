import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import {
  changeCTR,
  closeCTR,
  ctrDropDown,
  getCurrentCTR,
  getUnassignedCLPCTR,
  updateCTR,
} from "../../services/api.service";

function CLPCTRDialog2({ open, handleCloseCTR }) {
  const [CTR, setCTR] = React.useState({
    id: "",
    CtrNo: "",
    startTime: "",
    startDate: "",
    oldCtr: "",
    oldCtrId: "",
  });
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
          startTime: "",
          startDate: "",
          oldCtr: "",
          oldCtrId: "",
        });
        alert("CTR changed successfully");
        loadCurrentAndUnassigned();
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
      console.log(curr.data);
      setCurrentCTR(curr.data);
      setCTR({
        ...CTR,
        oldCtr: curr.data[0].CtrNo,
        oldCtrId: curr.data[0].id,
      });

      const unassign = await getUnassignedCLPCTR();
      console.log(unassign.data);
      setUnassignedCTR(unassign.data);
    } catch (e) {}
  };

  const setOldCtr = (e) => {
    const current = currentCTR.findIndex(
      (item) => item.CtrNo === e.target.value
    );
    setCTR({
      ...CTR,
      oldCtr: currentCTR[current].CtrNo,
      oldCtrId: currentCTR[current].id,
    });
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
    <div>
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
              // console.log(CTR);
            }}
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </Button>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} style={{ width: "320px" }}>
              <Grid item xs={12}>
                {/* <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Old CTR
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Old CTR"
                    value={CTR.oldCtr}
                    onChange={(e) => setOldCtr(e)}
                  >
                    {currentCTR.length > 0 &&
                      currentCTR?.map((item, i) => (
                        <MenuItem value={item?.CtrNo} key={i}>
                          {item?.CtrNo}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl> */}
                <TextField
                  variant="outlined"
                  fullWidth
                  id="time"
                  label="Current CTR"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={CTR.oldCtr}
                  disabled
                />
              </Grid>

              {unassignedCTR.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={unassignedCTR}
                      getOptionLabel={(option) => option.CtrNo}
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
                  value={CTR.startTime}
                  onChange={(e) =>
                    setCTR({ ...CTR, startTime: e.target.value })
                  }
                />
              </Grid>

              {/* {CTR.currentCtr === "enter manually" ? (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={CTR.currentCtrInput}
                    onChange={(e) =>
                      setCTR({ ...CTR, currentCtrInput: e.target.value })
                    }
                    placeholder="Type Or Select From Dropdown Menu"
                    label="Current CTR"
                  />
                </Grid>
              ) : null} */}

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
              //   console.log(CTR);
              ChangeCTR();
              // handleCloseCTR();
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
