const { callBackend } = require("./http.service");

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

export const deleteOperatorSchedule = async (formData) => {
  return await callBackend(
    "POST",
    "routes/addScheduleDetailCutting/delete",
    true,
    formData
  );
};

export const defectViolation = async (
  fromDate,
  toDate,
  fabricCategory,
  machine,
  shifts
) => {
  const data = {
    fabricCategory,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/cutting/KPI/violation/defectViolation",
    true,
    data
  );
};
export const getViolationDetailData = async (id) => {
  return await callBackend(
    "POST",
    "routes/cutting/KPI/violation/getDataByVolId",
    true,
    {
      volId: id,
    }
  );
};

export const cuttingViolationSupervisorUpdate = async (
  volId,
  supervisorName
) => {
  const data = {
    volId,
    supervisorName,
  };
  return await callBackend(
    "POST",
    "routes/cutting/KPI/violation/updateSupervisorByvolId",
    true,
    data
  );
};

export const cuttingCommunicatedTo = async (to, id, reason) => {
  const data = {
    communicatedTo: to,
    violationId: id,
    violationReason: reason,
  };
  return await callBackend(
    "POST",
    "routes/cutting/KPI/violation/communicatedTo",
    true,
    data
  );
};

export const violationCommentCutting = async (
  id,
  reason,
  action,
  isCorrect,
  isIncorrect,
  incorrect,
  actual,
  reassigned
) => {
  return await callBackend(
    "POST",
    "routes/cutting/KPI/violation/addComment",
    true,
    {
      violationId: id,
      violationReason: reason,
      action: action,
      confirmStatus: isCorrect,
      incorrectStatus: isIncorrect,
      incorrectViolationReason: incorrect,
      actualSupervisor: actual,
      reassignedSupervisor: reassigned,
    }
  );
};

export const cuttingViolationClosedByUpdate = async (
  volId,
  closedBySupervisor
) => {
  const data = {
    volId,
    closedBySupervisor,
  };
  return await callBackend(
    "POST",
    "routes/cutting/KPI/violation/violationClosedBy",
    true,
    data
  );
};

export const notificationLogs = async (filterDateFrom, filterDateTo) => {
  const data = {
    filterDateFrom,
    filterDateTo,
  };
  return await callBackend("POST", "routes/cutting/notifLog", true, data);
};

export const getUnassignedRoll = async () => {
  return await callBackend("GET", "routes/roll/allUnassignedRoll");
};

export const getCurrentRoll = async () => {
  return await callBackend("GET", "routes/roll/currentRoll");
};

export const updateRoll = async (data) => {
  // console.log(data);
  return await callBackend("POST", "routes/roll/updateRoll", true, data);
};

export const closeRoll = async (data) => {
  return await callBackend("POST", "routes/roll/closeRoll", true, data);
};

// export const rollSummary = async (data) => {
//   return await callBackend("POST", "routes/cutting/notifLog", true, data);
// };

export const liveDefect = async () => {
  return await callBackend(
    "GET",
    "routes/cutting/KPI/violation/getLatestDefectDetails"
  );
};

// ROll DIALOG API

export const getClpCtr = async () => {
  return await callBackend("GET", "routes/roll/getClpCtr");
};

export const getBodyPart = async (data) => {
  return await callBackend("POST", "routes/roll/rollCategory", true, data);
};

export const getRollIds = async (data) => {
  return await callBackend("POST", "routes/roll/rollIds", true, data);
};

export const deleteSUpervisorSchedule = async (data) => {
  return await callBackend(
    "POST",
    "routes/cuttingSupervisorSchedule/deleteSupervisor",
    true,
    data
  );
};
