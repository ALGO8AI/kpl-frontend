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
