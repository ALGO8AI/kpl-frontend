/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
import React from "react";
import {
  changeCTR,
  ctrDropDown,
  getCurrentCTR,
  getUnassignedCLPCTR,
} from "../../services/api.service";

function RollDialog({ open, handleCloseCTR }) {
  const [ctrDrop, setCtrDrop] = React.useState();
  const [CTR, setCTR] = React.useState({
    currentCtr: "",
    currentCtrInput: "",
    clpctr: "",
    clpctrInput: "",
    wing: "",
    line: "",
    resourceId: "",
    startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
  });
  const [CTRresp, setCTRresp] = React.useState("");

  const [currentCTR, setCurrentCTR] = React.useState([]);
  const [unassignedCTR, setUnassignedCTR] = React.useState([]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseCTR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: "100%", display: "flex" }}>
          <h2 style={{ padding: "12px", margin: "auto" }}>Change Roll</h2>
          <Button
            onClick={() => {
              handleCloseCTR();
            }}
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </Button>
        </div>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} style={{ width: "320px" }}>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Machine
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select Machine"
                    // value={CTR.currentCtr}
                    // onChange={(e) =>
                    //   setCTR({ ...CTR, currentCtr: e.target.value })
                    // }
                  >
                    {/* <MenuItem value={"enter manually"}>Enter Manually</MenuItem> */}
                    {[1, 2, 3, 4].map((item, i) => (
                      <MenuItem value={item} key={i}>
                        Machine {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Barcode
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select Barcode"
                    // value={CTR.wing}
                    onChange={(e) => setCTR({ ...CTR, wing: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((item, i) => (
                      <MenuItem value={item} key={i}>
                        Barcode {item}
                      </MenuItem>
                    ))
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
                    Select Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select Category"
                    // value={CTR.clpctr}
                    // onChange={(e) => setCTR({ ...CTR, clpctr: e.target.value })}
                  >
                    {/* <MenuItem value={"enter manually"}>Enter Manually</MenuItem> */}
                    <MenuItem value=""></MenuItem>
                    {["Standard", "Food Grade"].map((item, i) => (
                      <MenuItem value={item} key={i}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* {CTR.clpctr === "enter manually" ? (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={CTR.clpctrInput}
                    onChange={(e) =>
                      setCTR({ ...CTR, clpctrInput: e.target.value })
                    }
                    placeholder="Type Or Select From Dropdown Menu"
                    label="CLP-CTR"
                  />
                </Grid>
              ) : null} */}
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="time"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}

                  //   value={CTR.startTime}
                  //   onChange={(e) =>
                  //     setCTR({ ...CTR, startTime: e.target.value })
                  //   }
                />
              </Grid>

              <Grid item xs={6}>
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
                  //   value={CTR.startTime}
                  //   onChange={(e) =>
                  //     setCTR({ ...CTR, startTime: e.target.value })
                  //   }
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCloseCTR();
              console.log(CTR);
            }}
            style={{
              border: "1px solid #0e4a7b",
            }}
          >
            End Current Roll
          </Button>
          <Button
            variant="contained"
            // onClick={() => {
            //   // console.log(CTR);
            //   // handleCloseCTR();

            //   ChangeCTR();
            //   setCTR({
            //     ...CTR,
            //     clpctr: "",
            //     currentCtr: "",
            //     line: "",
            //     resourceId: "",
            //     startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
            //     wing: "",
            //   });
            // }}
            color="primary"
            autoFocus
          >
            Start New Roll
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RollDialog;
