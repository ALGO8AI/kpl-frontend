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

function ClpCtrDialog({ open, handleCloseCTR }) {
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

  const ChangeCTR = async () => {
    try {
      var txt = window.confirm("CTR will be changed, Do you want to proceed ?");
      if (txt) {
        const resp = await changeCTR({
          currentCtr:
            CTR.currentCtr === "enter manually"
              ? CTR.currentCtrInput
              : CTR.currentCtr,
          clpctr:
            CTR.clpctr === "enter manually" ? CTR.clpctrInput : CTR.clpctr,
          wing: CTR.wing,
          line: CTR.line,
          resourceId: CTR.resourceId,
          startTime: CTR.startTime,
        });
        console.log(resp.msg);
        setCTRresp(resp.msg);
        // const data = {
        //   currentCtr:
        //     CTR.currentCtr === "enter manually"
        //       ? CTR.currentCtrInput
        //       : CTR.currentCtr,
        //   clpctr: CTR.clpctr,
        //   wing: CTR.wing,
        //   line: CTR.line,
        //   resourceId: CTR.resourceId,
        //   startTime: CTR.startTime,
        // };
        // console.log(data);
      }
    } catch (err) {}
  };

  const loadData = async () => {
    try {
      const ctr = await ctrDropDown();
      setCtrDrop(ctr);
      setCTR({
        ...CTR,
        currentCtr: ctr?.currentCLPCTR[0]?.clpCtr,
        wing: ctr?.data[0]?.wing,
        clpctr: ctr?.data[0]?.clpCtr,
        resourceId: ctr?.data[0]?.resourceId,
        line: "U+2",
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadCurrentAndUnassigned = async () => {
    try {
      const curr = await getCurrentCTR();
      console.log(curr.data);
      setCurrentCTR(curr.data);

      const unassign = await getUnassignedCLPCTR();
      console.log(unassign.data);
      setUnassignedCTR(unassign.data);
    } catch (e) {}
  };

  React.useEffect(() => {
    loadData();
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
        <h2 style={{ padding: "12px", margin: "auto" }}>Change CTR</h2>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1} style={{ width: "320px" }}>
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
                    <MenuItem value={"enter manually"}>Enter Manually</MenuItem>
                    {ctrDrop &&
                      ctrDrop?.currentCLPCTR?.map((item, i) => (
                        <MenuItem value={item.clpCtr} key={i}>
                          {item.clpCtr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {CTR.currentCtr === "enter manually" ? (
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
              ) : null}
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
                    {ctrDrop &&
                      [...new Set(ctrDrop?.data?.map((item) => item.wing))].map(
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
                    <MenuItem value={"enter manually"}>Enter Manually</MenuItem>
                    <MenuItem value=""></MenuItem>
                    {ctrDrop &&
                      ctrDrop?.data?.map((item, i) => (
                        <MenuItem value={item.clpCtr} key={i}>
                          {item.clpCtr}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {CTR.clpctr === "enter manually" ? (
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
              ) : null}
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
                    {ctrDrop &&
                      [
                        ...new Set(
                          ctrDrop?.data?.map((item) => item.resourceId)
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
                {/* <TextField
                  variant="outlined"
                  fullWidth
                  value={CTR.line}
                  onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                  label="Line"
                /> */}

                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Line
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Line"
                    value={CTR.line}
                    onChange={(e) => setCTR({ ...CTR, line: e.target.value })}
                    // value={ctrDrop && ctrDrop.data[0].resourceId}
                  >
                    <MenuItem value=""></MenuItem>
                    {["U+2", "Baffle", "Circular", "Two Row"].map((item, i) => (
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
              console.log(CTR);
            }}
            style={{
              border: "1px solid #0e4a7b",
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
                startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
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
