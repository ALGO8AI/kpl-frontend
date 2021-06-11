import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MaterialTable from "material-table";
import {
  copyScheduleStitching,
  scheduleUpload,
  updateStitchingWorkerSchedule,
} from "../../../services/api.service";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getYourData } from "../../../services/api.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  Switch,
} from "@material-ui/core";
import { NextWeekRounded } from "@material-ui/icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Schedule(props) {
  const [file, setFile] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState(false);
  const [msg, setMsg] = React.useState(false);

  const loadData = async () => {
    try {
      const x = await getYourData();
      console.log(x);

      setData(x.latestScheduleData);
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const copy = async () => {
    try {
      const response = await copyScheduleStitching();
      setMsg(response.msg);
      setSeverity("success");
      setOpen(true);
      loadData();
    } catch (e) {}
  };

  const [columns, setColumns] = useState([
    {
      title: "Date",
      field: "Date",
      render: (rowData) => {
        const date1 = new Date(rowData.Date).toLocaleString().split(",");
        // return date1[0]
        const dd = date1[0].split("/");
        return dd[1] + "/" + dd[0] + "/" + dd[2];
      },
    },
    { title: "ID", field: "id" },

    { title: "Worker ID", field: "workerId" },
    { title: "Shift", field: "shift" },
    { title: "Wing", field: "wing" },
    { title: "Machine ID", field: "machineId" },
    {
      title: "Machine Status",
      render: (x) => (Boolean(x.machineOnOffStatus) ? "On" : "Off"),
    },
    {
      title: "Edit",
      render: (x) => (
        <button
          style={{
            color: "#0e4a7b",
            textDecoration: "underline",
            backgroundColor: "white",
            padding: "8px 16px",
            border: "none",
            outline: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          onClick={() => {
            handleClickOpenDialog();
            setScheduleData({
              date: new Date(x.Date).toISOString().slice(0, 10),
              workerId: x.workerId,
              shift: x.shift,
              wing: x.wing,
              machineId: x.machineId,
              machineOnOffStatus: Boolean(x.machineOnOffStatus),
              id: x.id,
            });
          }}
        >
          EDIT
        </button>
      ),
    },
  ]);

  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [scheduleData, setScheduleData] = React.useState({
    date: "",
    workerId: "",
    shift: "",
    wing: "",
    machineId: "",
    id: "",
    machineOnOffStatus: false,
  });

  const onScheduleDataChange = (e) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (files) => {
    // console.log(files[0])
    setFile(files[0]);
    // console.log(file)
  };

  const updateSchedule = async () => {
    try {
      const resp = await updateStitchingWorkerSchedule(scheduleData);
      console.log(resp);
      setMsg(resp.msg);
      setSeverity("success");
      setOpen(true);
      loadData();
      setOpenDialog(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const submit = async () => {
    if (file) {
      // console.log("the selected file is:")
      // console.log(file)
      const formData = new FormData();
      // const myFile=file
      formData.append("myFile", file, file.name);
      try {
        // await scheduleUpload(formData)
        await axios
          .post("http://52.66.200.163:3000/routes/scheduleUpdate", formData)
          .then((x) => {
            // console.log('return value:')
            if (x) {
              if (x.data) {
                if (x.data === "File uploaded") {
                  setMsg("File Uploaded");
                  setSeverity("success");
                  setOpen(true);
                } else {
                  setMsg("File Not Uploaded");
                  setSeverity("error");
                  setOpen(true);
                }
              } else {
                setMsg("Database Error");
                setSeverity("error");
                setOpen(true);
              }
            } else {
              alert("could not connect to internet");
            }
          });
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Select a File!");
    }
  };
  return (
    <Grid container spacing={4} md={12}>
      <Grid item md={4} xs={12} style={{ backgroundColor: "#FFF" }}>
        <DropzoneArea
          onChange={handleFileChange}
          dropzoneText={"Drag and drop files or click here"}
          acceptedFiles={[".csv", ".xls", ".xlsx"]}
        />
        <br />
        <div
          className="customUpload"
          style={{ padding: "4px 0px" }}
          onClick={submit}
        >
          <CloudUploadIcon />
          &nbsp;Upload Schedule
        </div>
      </Grid>
      <Grid item md={8} xs={12}>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#0e4a7b",
            color: "#FFF",
            whiteSpace: "nowrap",
            width: "100%",
            height: "fit-content",
            border: "1px solid #0e4a7b",
          }}
          onClick={copy}
        >
          COPY TABLE
        </Button>
        <MaterialTable
          title="Schedule Information"
          columns={columns}
          data={data}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
          style={{ width: "100%" }}
        />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "900px", margin: "auto" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"UPDATE WORKER SCHEDULE"}
        </DialogTitle>
        <DialogContentText id="alert-dialog-description">
          <Grid container item style={{ padding: "12px", minWidth: "600px" }}>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Machine Id"
                variant="outlined"
                value={scheduleData.machineId}
                name="machineId"
                fullWidth
                onChange={onScheduleDataChange}
              />
            </Grid>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Worker Id"
                variant="outlined"
                value={scheduleData.workerId}
                name="workerId"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Date"
                variant="outlined"
                value={scheduleData.date}
                name="date"
                type="date"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Wing"
                variant="outlined"
                value={scheduleData.wing}
                name="wing"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>{" "}
            <Grid md={6} style={{ padding: "12px" }}>
              <TextField
                id="outlined-basic"
                label="Shift"
                variant="outlined"
                value={scheduleData.shift}
                name="shift"
                onChange={onScheduleDataChange}
                fullWidth
              />
            </Grid>
            <Grid
              md={6}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={scheduleData.machineOnOffStatus}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        machineOnOffStatus: e.target.checked,
                      })
                    }
                    name="machineOnOffStatus"
                    color="primary"
                  />
                }
                label="Machine Status"
              />
            </Grid>
          </Grid>
        </DialogContentText>

        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="secondary"
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            }}
            onClick={updateSchedule}
            autoFocus
          >
            UPDATE
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Schedule;
