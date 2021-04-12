import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { DropzoneArea } from "material-ui-dropzone";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MaterialTable from "material-table";
import { scheduleUpload } from "../../../services/api.service";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { getYourData } from "../../../services/api.service";

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

      setData(x.latestScheduleData);
    } catch (err) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
    { title: "Worker ID", field: "workerId" },
    { title: "Shift", field: "shift" },
    { title: "Wing", field: "wing" },
    { title: "Machine ID", field: "machineId" },
  ]);

  const [data, setData] = useState([]);

  const handleFileChange = (files) => {
    // console.log(files[0])
    setFile(files[0]);
    // console.log(file)
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
    <Grid container spacing={4}>
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
          }}
          // style={{ marginLeft: "50px" }}
        />
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Schedule;
