const { callBackend } = require("./http.service");
const axios = require("axios");

export const addOperatorCutting = async (formData) => {
  return await callBackend("POST", "routes/addOperatorCutting", true, formData);
};

export const updateOperatorCutting = async (formData) => {
  return await callBackend(
    "POST",
    "routes/addOperatorCutting/update",
    true,
    formData
  );
};

export const deleteOperatorCutting = async (formData) => {
  return await callBackend(
    "POST",
    "routes/addOperatorCutting/delete",
    true,
    formData
  );
};

export const addScheduleDetail = async (formData) => {
  return await callBackend(
    "POST",
    "routes/addScheduleDetailCutting/add",
    true,
    { data: formData }
  );
};
