import { Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import PublishIcon from "@material-ui/icons/Publish";
import { theme } from "../../../Utility/constants";
import DeleteIcon from "@material-ui/icons/Delete";

function TrainingVideos() {
  const [selectFile, setSelectFile] = React.useState(null);
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
                />
              </label>
              {selectFile?.name && (
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <Grid container item xs={12} md={3} style={{ padding: "0.5rem" }}>
                <video
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                  controls
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
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
                    Title {Math.floor(Math.random() * 999)}
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
