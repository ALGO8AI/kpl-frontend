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

export const cuttingOperator = async () => {
  return await callBackend("GET", "routes/cutting/operator/all");
};

export const cuttingSupervisorSchedule = async () => {
  return await callBackend("GET", "routes/cutting/supervisorSchedule/all");
};

export const addCuttingSupervisorSingle = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/cuttingSupervisorSchedule/addSingle",
    true,
    data
  );
};

export const updateCuttingSupervisorSingle = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/cuttingSupervisorSchedule/updateSingle",
    true,
    data
  );
};

export const getCuttingSupervisorCopy = async () => {
  return await callBackend(
    "GET",
    "routes/cuttingSupervisorSchedule/updateAllSchedule"
  );
};

export const getCuttingOperatorCopy = async () => {
  return await callBackend("GET", "routes/cutting/schedule/updateAllSchedule");
};

export const getCuttingOperatorSchedule = async () => {
  return await callBackend("GET", "routes/cutting/schedule/scheduleDetail");
};
