/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import PublishIcon from "@material-ui/icons/Publish";
import { theme } from "../../../Utility/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteVideo,
  getTrainigVideos,
  uploadVideo,
} from "../../../redux/CheckingReducer/CheckingV3Action";
import { useState } from "react";
import { openSnackbar } from "../../../redux/CommonReducer/CommonAction";
import Loader from "../../../components/loader/Loader";

function TrainingVideos() {
  const [selectFile, setSelectFile] = React.useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { trainingVideos } = useSelector((state) => state.CheckV3);

  useEffect(() => {
    dispatch(getTrainigVideos());
  }, []);

  const uploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("uploadFile", selectFile);
    let resp = await dispatch(uploadVideo(formData));
    if (resp) {
      setLoading(false);
      dispatch(openSnackbar(true, "success", "Video Uploaded Successfully"));
      dispatch(getTrainigVideos());
      setSelectFile(null);
    } else {
      dispatch(openSnackbar(true, "error", "Something went wrong. Try again"));
    }
    // setTimeout(() => {
    //   setLoading(false);
    //   dispatch(openSnackbar(true, "success", "Video Uploaded Successfully"));
    //   dispatch(getTrainigVideos());
    // }, 3000);
  };

  const deleteVid = async (id) => {
    let prompt = window.confirm("Are you sure you want to delete this video?");
    if (prompt) {
      let resp = await dispatch(deleteVideo({ filePath: id }));
      if (resp?.message) {
        dispatch(openSnackbar(true, "success", "Video Deleted Successfully"));
        dispatch(getTrainigVideos());
      } else {
        dispatch(
          openSnackbar(true, "error", "Something went wrong. Try again")
        );
      }
    }
  };

  return (
    <Grid
      container
      style={{
        padding: "1rem",
      }}
    >
      <Grid
        container
        item
        xs={12}
        md={12}
        style={{
          padding: "0.5rem",
        }}
      >
        <Grid
          // container
          item
          xs={12}
          component={Paper}
          elevation={3}
          style={{ padding: "0.5rem", marginBottom: "1rem" }}
        >
          <Typography
            variant="h5"
            style={{
              marginBottom: "1rem",
            }}
          >
            Upload Videos
          </Typography>

          <Grid container item xs={12}>
            <Grid
              container
              item
              xs={3}
              style={{ padding: "0.5rem" }}
              component={Paper}
              elevation={3}
            >
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "2rem 1rem",
                }}
              >
                <PublishIcon style={{ color: theme.BLUE }} />
                <h4
                  style={{
                    color: theme.ORANGE,
                    fontSize: "24px",
                    fontWeight: "400",
                  }}
                >
                  Upload Video
                </h4>

                <input
                  onChange={(e) => {
                    console.log(e.target.files);
                    setSelectFile(e.target.files[0]);
                  }}
                  type="file"
                  style={{ display: "none" }}
                  accept="video/*"
                />
              </label>
              {selectFile?.name && (
                <>
                  <p
                    style={{
                      marginTop: "1rem",
                      textAlign: "center",
                      color: theme.BLUE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {selectFile?.name}
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        color: theme.BLUE,
                      }}
                      onClick={() => {
                        setSelectFile(null);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </p>
                  <Button
                    onClick={uploadFile}
                    style={{
                      backgroundColor: theme.BLUE,
                      color: "white",
                    }}
                    variant="contained"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader
                        style={{
                          color: "white",
                        }}
                      />
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          component={Paper}
          elevation={3}
          style={{ padding: "0.5rem" }}
        >
          <Typography
            variant="h5"
            style={{
              marginBottom: "1rem",
            }}
          >
            All Videos
          </Typography>
          <Grid container item xs={12}>
            {trainingVideos?.map((item, index) => (
              <Grid
                container
                item
                xs={12}
                md={3}
                style={{ padding: "0.5rem" }}
                key={index}
              >
                <video
                  src={`http://120.120.120.147:3008/${item}`}
                  controls
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    aspectRatio: "16/9",
                  }}
                />

                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item}
                    <span
                      style={{
                        fontSize: "16px",
                        color: "grey",
                        marginLeft: "0.5rem",
                      }}
                    >
                      {new Date().toLocaleDateString()}
                    </span>
                  </Typography>
                </Grid>
                <Button
                  style={{
                    display: "block",
                  }}
                  variant="contained"
                  onClick={() => deleteVid(item)}
                >
                  DELETE
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TrainingVideos;
