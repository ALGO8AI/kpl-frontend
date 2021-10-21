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
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import {
  closeRoll,
  getCurrentRoll,
  getUnassignedRoll,
  updateRoll,
} from "../../services/cuttingApi.service";

function RollDialog({ open, handleCloseCTR }) {
  const [unassignedData, setUnassignedData] = useState([]);
  const [oldCTR, setOldCTR] = useState({
    oldCtr: "",
    oldCtrId: "",
    oldFabricRollNo: "",
    oldbodyPart: "",
  });
  const [selectedData, setSelectedData] = useState({
    id: "",
    CtrNo: "",
    FabricRollNo: "",
    bodyPart: "",
    startTime: "",
    startDate: "",
    // startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
    // startDate: new Date().toISOString().slice(0, 10),
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchUnassigned = async () => {
    try {
      const { data } = await getUnassignedRoll();
      setUnassignedData(data);
      const current = await getCurrentRoll();
      setOldCTR({
        oldCtr: current?.data[0]?.CtrNo,
        oldCtrId: current?.data[0]?.id,
        oldFabricRollNo: current?.data[0]?.FabricRollNo,
        oldbodyPart: current?.data[0]?.bodyPart,
      });
    } catch (e) {}
  };

  useEffect(() => {
    fetchUnassigned();
  }, []);

  const updateRollCutting = async () => {
    try {
      const data = {
        ...oldCTR,
        ...selectedData,
        // id: unassignedData.filter((i) => i.CtrNo === selectedData.CtrNo)[0].id,
      };
      const resp = await updateRoll(data);
      if (resp?.msg) {
        setOpenDialog(true);
        setMsg(resp.msg);
        handleCloseCTR();
      }
    } catch (e) {}
  };

  const closeRollCutting = async () => {
    try {
      const data = {
        CtrNo: selectedData.CtrNo,
        id: selectedData.id,
        FabricRollNo: selectedData.FabricRollNo,
        bodyPart: selectedData.bodyPart,
      };
      const resp = await closeRoll(data);
      if (resp?.msg) {
        setOpenDialog(true);
        setMsg(resp.msg);
        handleCloseCTR();
      }
    } catch (e) {}
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

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
                <Autocomplete
                  id="combo-box-demo"
                  options={unassignedData}
                  getOptionLabel={(option) => `${option.Clp}-${option.CtrNo}`}
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
                  onChange={(e, t) => {
                    const current = unassignedData.findIndex(
                      (item) => item?.CtrNo === t?.CtrNo
                    );
                    setSelectedData({
                      ...selectedData,
                      CtrNo: unassignedData[current]?.CtrNo,
                      id: unassignedData[current]?.id,
                    });
                  }}
                />
                {/* <FormControl variant="outlined" fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select CTR
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select CTR"
                    value={selectedData.CtrNo}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        CtrNo: e.target.value,
                      })
                    }
                  >
                    {unassignedData?.map((item, i) => (
                      <MenuItem value={item.CtrNo} key={i}>
                        {item.Clp}+{item.CtrNo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>
              {selectedData.CtrNo && (
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select Bodypart
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Select Bodypart"
                      value={selectedData.bodyPart}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          bodyPart: e.target.value,
                        })
                      }
                    >
                      {unassignedData
                        .filter((i) => i.CtrNo === selectedData.CtrNo)
                        ?.map((item, i) => (
                          <MenuItem value={item.bodyPart} key={i}>
                            {item.bodyPart}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              {selectedData.bodyPart && (
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select Fabric No.
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Select Fabric No."
                      value={selectedData.FabricRollNo}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          FabricRollNo: e.target.value,
                        })
                      }
                    >
                      {/* <MenuItem value={"enter manually"}>Enter Manually</MenuItem> */}
                      {unassignedData
                        .filter(
                          (i) =>
                            i.bodyPart === selectedData.bodyPart &&
                            i.CtrNo === selectedData.CtrNo
                        )
                        ?.map((item, i) => (
                          <MenuItem value={item.FabricRollNo} key={i}>
                            {item.FabricRollNo}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {selectedData.FabricRollNo && (
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
                    value={selectedData.startDate}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        startDate: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}

              {selectedData.startDate && (
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
                    defaultValue={selectedData.startTime}
                    onChange={(e) =>
                      setSelectedData({
                        ...selectedData,
                        startTime: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeRollCutting}
            style={{
              border: "1px solid #0e4a7b",
            }}
          >
            Close Current Roll
          </Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={updateRollCutting}
          >
            Start New Roll
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openDialog} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RollDialog;
