export const openSnackbar = (open, status, message) => (dispatch) => {
  dispatch({
    type: "OPEN_SNACK",
    payload: {
      open,
      status,
      message,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLOSE_SNACK",
    });
  }, 4000);
};

export const openSnackbar_FROM = () => (dispatch) => {
  dispatch({
    type: "OPEN_SNACK",
    payload: {
      open: true,
      status: "error",
      message: "From Date Must Be Less Than To Date",
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLOSE_SNACK",
    });
  }, 4000);
};

export const openSnackbar_TO = () => (dispatch) => {
  dispatch({
    type: "OPEN_SNACK",
    payload: {
      open: true,
      status: "error",
      message: "To Date Must Be Greater Than From Date",
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLOSE_SNACK",
    });
  }, 4000);
};
