/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import "./Worker.scss";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Alert } from "@material-ui/lab";
import {
  addTailorV3,
  deleteTailorV3,
  getTailorDetailsV3,
  updateTailorV3,
} from "../../../services/checking.api";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Tailor(props) {
  const [workerData, setWorkerData] = useState();
  const { selectedWing, wingList } = useSelector((state) => state?.CheckV3);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.Common);
  const isEnable = role === "admin" || role === "Admin";

  const loadData = async (Wing) => {
    try {
      const x = await getTailorDetailsV3(Wing);
      console.log(x);
      setWorkerData(x.data);
    } catch (err) {}
  };
  useEffect(() => {
    loadData(selectedWing || localStorage.getItem("kpl_wing"));
  }, [selectedWing]);
  const columns = [
    { title: "Tailor ID", field: "tailorId" },
    // {
    //   title: "Image",
    //   render: (rowData) => (
    //     <img
    //       style={{ width: "36px", height: "36px" }}
    //       src={rowData.image}
    //       alt={rowData.workerId}
    //     />
    //   ),
    // },
    { title: "Tailor Name", field: "tailorName" },
    { title: "Wing", field: "wing" },
    { title: "Wing ID", field: "wingId" },
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
            if (isEnable) {
              setEdit(true);
              setUserData({
                ...userdata,
                name: x.tailorName,
                workerId: x.tailorId,
                workerImage: x.image,
                wing: x.wing,
                id: x.id,
                wingId: x.wingId,
              });
            } else {
              dispatch(
                openSnackbar(true, "error", `Access denied for ${role}`)
              );
            }
          }}
        >
          EDIT
        </button>
      ),
    },
  ];
  const [userdata, setUserData] = useState({
    name: "",
    workerId: "",
    workerImage: "",
    id: "",
    wing: "",
    wingId: "",
  });
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = useState(false);

  // const uploadImage = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertBase64(file);
  //   setUserData({ ...userdata, workerImage: base64 });
  // };

  const submitImageDetails = async () => {
    if (isEnable) {
      try {
        if (
          !userdata.name ||
          !userdata.workerId ||
          !userdata.wing ||
          !userdata?.wingId
        ) {
          return dispatch(
            openSnackbar(true, "error", "Please Fill All Fields")
          );
        }
        const resp = await addTailorV3(
          userdata.name,
          userdata.workerId,
          userdata.wing,
          userdata?.wingId
        );
        // console.log(resp);
        setMsg(resp.msg);
        setOpen(true);
        loadData(selectedWing || localStorage.getItem("kpl_wing"));
        setUserData({
          name: "",
          workerId: "",
          workerImage: "",
          id: "",
          wing: "",
          wingId: "",
        });
      } catch (e) {
        // console.log(e.message);
      }
    } else {
      dispatch(openSnackbar(true, "error", `Access denied for ${role}`));
    }
  };

  const updateImageDetails = async () => {
    try {
      const resp = await updateTailorV3(
        userdata.name,
        userdata.workerId,
        userdata.wing
      );
      // console.log(resp);
      setMsg(resp.msg);
      setOpen(true);
      loadData(selectedWing || localStorage.getItem("kpl_wing"));
      setUserData({
        name: "",
        workerId: "",
        workerImage: "",
        id: "",
        wing: "",
      });
      setEdit(false);
    } catch (e) {
      // console.log(e.message);
    }
  };

  const deleteImageDetails = async () => {
    try {
      const resp = await deleteTailorV3(
        userdata.name,
        userdata.workerId,
        userdata.id
      );
      loadData(selectedWing || localStorage.getItem("kpl_wing"));
      setUserData({
        name: "",
        workerId: "",
        workerImage: "",
        id: "",
        wing: "",
      });
      // console.log(resp);
      setMsg(resp?.msg);
      setOpen(true);
      setEdit(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={4}>
        <TextField
          id="outlined-basic"
          label="Tailor Name"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.name}
          fullWidth
          onChange={(e) => setUserData({ ...userdata, name: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Tailor ID"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.workerId}
          fullWidth
          onChange={(e) =>
            setUserData({ ...userdata, workerId: e.target.value })
          }
        />
        <TextField
          id="outlined-basic"
          label="Wing ID"
          variant="outlined"
          style={{ marginBottom: "12px" }}
          value={userdata.wingId}
          fullWidth
          onChange={(e) => setUserData({ ...userdata, wingId: e.target.value })}
        />
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "12px" }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Wing</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={userdata.wing}
            onChange={(e) => setUserData({ ...userdata, wing: e.target.value })}
            label="Wing"
            // multiple
          >
            {wingList?.length > 0 &&
              wingList?.map((item, index) => (
                <MenuItem key={index} value={item?.wing}>
                  {item?.wing}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        {/* <label for="myfile" className="inputLabel">
          Select a file:
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="myfile"
          name="myfile"
          accept=".jpg,.png,.jpeg"
          onChange={(e) => {
            uploadImage(e);
          }}
        /> */}
        {/* {userdata.workerImage && (
          <img
            style={{ width: "100%", padding: "12px" }}
            src={userdata.workerImage}
            alt="User"
          />
        )} */}
        {edit ? (
          <Grid container xs={12}>
            <Grid container item xs={6} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "#0e4a7b",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #0e4a7b",
                }}
                onClick={() => {
                  setEdit(false);
                  setUserData({
                    name: "",
                    workerId: "",
                    workerImage: "",
                    wing: "",
                  });
                }}
              >
                CANCEL
              </Button>
            </Grid>
            <Grid container item xs={6} style={{ padding: "6px" }}>
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
                onClick={updateImageDetails}
              >
                UPDATE
              </Button>
            </Grid>
            <Grid container item xs={12} style={{ padding: "6px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#b53f3f",
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  width: "100%",
                  height: "fit-content",
                  border: "1px solid #b53f3f",
                }}
                onClick={deleteImageDetails}
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container item xs={12} style={{ padding: "6px" }}>
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
              onClick={submitImageDetails}
            >
              {/* <FilterListIcon /> */}
              SAVE
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <MaterialTable
          title="Tailors Information"
          columns={columns}
          data={workerData}
          options={{
            exportButton: true,
            headerStyle: {
              backgroundColor: "#0e4a7b",
              color: "#FFF",
            },
            pageSizeOptions: [20, 50, 100, 200],
            pageSize: 20,
          }}
        />
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Tailor;
