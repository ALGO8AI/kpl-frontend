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
import React, { useState, useEffect } from "react";
import { changeCTR, ctrDropDown } from "../../services/api.service";

function ClpCtrDialog({ open, handleCloseCTR }) {
  const [ctrDrop, setCtrDrop] = React.useState();
  const [CTR, setCTR] = React.useState({
    currentCtr: "",
    clpctr: "",
    wing: "",
    line: "",
    resourceId: "",
    startTime: new Date().toLocaleTimeString().slice(0, 5),
  });
  const [CTRresp, setCTRresp] = React.useState("");

  const ChangeCTR = async () => {
    try {
      const resp = await changeCTR(CTR);
      console.log(resp.msg);
      setCTRresp(resp.msg);
    } catch (err) {}
  };

  const loadData = async () => {
    try {
      const ctr = await ctrDropDown();
      console.log(ctr);
      setCtrDrop(ctr);
    } catch (err) {}
  };
  React.useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseCTR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 style={{ padding: "12px", margin: "auto" }}>Change CTR</h2>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} style={{ width: "320px" }}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={CTR.currentCtr}
                  onChange={(e) =>
                    setCTR({ ...CTR, currentCtr: e.target.value })
                  }
                  placeholder="Type Or Select From Dropdown Menu"
                  label="Current CTR"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Current CTR
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Current CTR"
                    value={CTR.currentCtr}
                    onChange={(e) =>
                      setCTR({ ...CTR, currentCtr: e.target.value })
                    }
                  >
                    {ctrDrop &&
                      ctrDrop.currentCLPCTR.map((item, i) => (
                        <MenuItem value={item.clpCtr} key={i}>
                          {item.clpCtr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Wing
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Wing"
                    value={CTR.wing}
                    onChange={(e) => setCTR({ ...CTR, wing: e.target.value })}
                  >
                    {
                      ctrDrop &&
                        [...new Set(ctrDrop.data.map((item) => item.wing))].map(
                          (item, i) => (
                            <MenuItem value={item} key={i}>
                              {item}
                            </MenuItem>
                          )
                        )
                      // ctrDrop.data.map((item, i) => (
                      //   <MenuItem value={item.wing} key={i}>
                      //     {item.wing}
                      //   </MenuItem>
                      // ))
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    CLP-CTR
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="CLP-CTR"
                    value={CTR.clpctr}
                    onChange={(e) => setCTR({ ...CTR, clpctr: e.target.value })}
                  >
                    <MenuItem value=""></MenuItem>
                    {ctrDrop &&
                      ctrDrop.data.map((item, i) => (
                        <MenuItem value={item.clpCtr} key={i}>
                          {item.clpCtr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Resource Id
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Resource Id"
                    value={CTR.resourceId}
                    onChange={(e) =>
                      setCTR({ ...CTR, resourceId: e.target.value })
                    }
                    // value={ctrDrop && ctrDrop.data[0].resourceId}
                  >
                    <MenuItem value=""></MenuItem>
                    {
                      ctrDrop &&
                        [
                          ...new Set(
                            ctrDrop.data.map((item) => item.resourceId)
                          ),
                        ].map((item, i) => (
                          <MenuItem value={item} key={i}>
                            {item}
                          </MenuItem>
                        ))
                      // ctrDrop.data.map((item, i) => (
                      //   <MenuItem value={item.resourceId} key={i}>
                      //     {item.resourceId}
                      //   </MenuItem>
                      // ))
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  value={CTR.line}
                  onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                  label="Line"
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
                  value={CTR.startTime}
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
            onClick={() => {
              handleCloseCTR();
              setCTRresp("");
              setCTR({
                ...CTR,
                clpctr: "",
                currentCtr: "",
                line: "",
                resourceId: "",
                startTime: new Date().toLocaleTimeString().slice(0, 5),
                wing: "",
              });
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // console.log(CTR);
              // handleCloseCTR();

              ChangeCTR();
              setCTR({
                ...CTR,
                clpctr: "",
                currentCtr: "",
                line: "",
                resourceId: "",
                startTime: new Date().toLocaleTimeString().slice(0, 5),
                wing: "",
              });
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

export default ClpCtrDialog;
