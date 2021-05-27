const { callBackend } = require("./http.service");
const axios = require("axios");

/* 
example apis-

const function=async ()=>{
    const {data}=await callBackend('Type:GET/POST/PUT/DELETE','path:/v1/health','auth:true/false','body:{}',formData:true/false)
    return data
}

*/

const login = async (userName, passWord) => {
  return await callBackend(
    "POST",
    "login",
    false,
    {
      username: userName,
      password: passWord,
    },
    false
  );
};

const getViolation = async () => {
  return await callBackend("GET", "routes/KPI/feedUnavailable_crowding");
};

const getWorkerUtilization = async () => {
  return await callBackend(
    "GET",
    "routes/KPI/workerUtilization_crowdingInstances"
  );
};

const homepageData = async () => {
  return await callBackend("POST", "routes/KPI/homepageData");
};

const violationData = async () => {
  return await callBackend("POST", "routes/KPI/violationpageData");
};

const scheduleUpload = async (formData) => {
  // console.log("inside schedule-upload")
  // const { data } =
  // return ( await callBackend('POST','routes/scheduleUpdate',true,formData,true))
  axios.post("http://52.66.200.163:3000/routes/scheduleUpdate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // return data;
};

const homeDateFilter = async (fromDate, toDate) => {
  // console.log("home filter function")
  // const { data } =
  // return ( await callBackend('POST','routes/scheduleUpdate',true,formData,true))

  const { data } = await axios.post(
    "http://52.66.200.163:3001/routes/KPI/homepageData",
    {
      filterDateFrom: fromDate,
      filterDateTo: toDate,
    }
  );
  return data;

  // return data;
};

const workerUnavailableViolation = async (
  fromDate,
  toDate,
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/workerUnavailableViolation",
    true,
    data
  );
};

const workerUnavailableViolationChecking = async (
  fromDate,
  toDate
  // ctr,
  // machine
) => {
  const data = {
    // clpctr: ctr,
    // machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
  };
  console.log(data);
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/workerUnavailableViolation",
    true,
    data
  );
};

const feedUnavailableViolation = async (
  fromDate,
  toDate,
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/feedUnavailable",
    true,
    data
  );
};

const crowdingViolation = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/crowdingViolation",
    true,
    data
  );
};

const crowdingViolationChecking = async (fromDate, toDate, ctr, machine) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/crowdingViolation",
    true,
    data
  );
};

const violationByWorkerF = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/violationByWorker",
    true,
    data
  );
};

const violationDateFilter = async (fromDate, toDate) => {
  // console.log("violation filter function")
  // const { data } =
  // return ( await callBackend('POST','routes/scheduleUpdate',true,formData,true))

  const { data } = await axios.post(
    "http://52.66.200.163:3001/routes/KPI/violationpageData",
    {
      filterDateFrom: fromDate,
      filterDateTo: toDate,
    }
  );
  // console.log(data)
  return data;

  // return data;
};

const videoWallStitching = async () => {
  return await callBackend("GET", "routes/videoWall/stitching");
};
const videoWallChecking = async () => {
  return await callBackend("GET", "routes/videoWall/checking");
};

const videoWallCutting = async () => {
  return await callBackend("GET", "routes/videoWall/cutting");
};

const getYourData = async () => {
  return await callBackend("GET", "routes/yourData");
};

const getViolationDetailData = async (id) => {
  return await callBackend("POST", "routes/KPI/violation/getVolIdData", true, {
    volId: id,
  });
};

const violationComment = async (
  id,
  reason,
  action,
  isCorrect,
  isIncorrect,
  incorrect
) => {
  // console.log(id+''+reason+''+action+''+isCorrect+''+isIncorrect+''+incorrect)
  return await callBackend("POST", "routes/KPI/violation/addComment", true, {
    violationId: id,
    violationReason: reason,
    action: action,
    confirmStatus: isCorrect,
    incorrectStatus: isIncorrect,
    incorrectViolationReason: incorrect,
  });
};

const workerUtilizationData = async (fromDate, toDate, ctr, machine, shift) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shift,
  };
  console.log(data);
  return await callBackend(
    "POST",
    "routes/KPI/home/workerUtilization",
    true,
    data
  );
};
const crowdingInstanceData = async (fromDate, toDate) => {
  return await callBackend(
    "POST",
    "routes/KPI/home/crowdingInstanceData",
    true,
    {
      filterDateFrom: fromDate,
      filterDateTo: toDate,
    }
  );
};

const crowdingInstanceCheckingData = async (fromDate, toDate) => {
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/crowdingInstanceData",
    true,
    {
      filterDateFrom: fromDate,
      filterDateTo: toDate,
    }
  );
};

const summaryByViolationData = async (
  fromDate,
  toDate,
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByViolation",
    true,
    data
  );
};

const summaryByWorkerData = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByWorker",
    true,
    data
  );
};
const machineData = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByMachineId",
    true,
    data
  );
};

const ClpCtrData = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
  };

  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByClpCtrChecking",
    true,
    data
  );
};

const stitchingAlert = async (data) => {
  console.log(data);
  return await callBackend("POST", "routes/stitching/notifConfig", true, {
    data,
  });
};

const stitchingNotification = async (data) => {
  console.log(data);
  return await callBackend(
    "POST",
    "routes/stitching/notifConfig/notifMode",
    true,
    {
      data,
    }
  );
};
const UpdateStitchingUserData = async (data) => {
  return await callBackend(
    "POST",
    "routes/admin/manageUser/updateUser",
    true,
    data
  );
};

const loadStitchingAlertData = async (data) => {
  console.log(data);

  return await callBackend("GET", "routes/stitching/notifConfig");
};

const loadTableId = async () => {
  return await callBackend("GET", "routes/checking/KPI/home/allTableID");
};

const removeNotification = async (id) => {
  return await callBackend(
    "GET",
    `routes/stitching/notifConfig/updateSeenOnes/+${id}`
  );
};

const WORKER_UnavailableViolation = async () => {
  return await callBackend(
    "GET",
    "routes/KPI/violation/workerUnavRecentIncidents"
  );
};
const FEED_UnavailableViolation = async () => {
  return await callBackend("GET", "routes/KPI/violation/feedRecentIncidents");
};

const StitchingUserData = async () => {
  return await callBackend("GET", "routes/admin/manageUser/getUser");
};
const ctr_machineID = async () => {
  return await callBackend("GET", "routes/KPI/home/clpctrAndMachineID");
};

const AddNewUser = async (data) => {
  console.log(data);
  return await callBackend(
    "POST",
    "routes/admin/manageUser/addUser",
    true,
    data
  );
};

const ctrDropDown = async () => {
  return await callBackend("POST", "routes/KPI/home/changeCTRFormData", true, {
    wing: "FG2",
    lineResourceId: 26,
  });
};

const changeCTR = async (data) => {
  // console.log(data);
  return await callBackend("POST", "routes/KPI/home/changeCTR", true, data);
};

const getStitchingNotification = async () => {
  return await callBackend(
    "GET",
    "routes/stitching/notifConfig/getNotification"
  );
};

const machineBreakdownData = async (fromDate, toDate, machine, shift) => {
  const data = {
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shift,
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/machineBreakdownData",
    true,
    data
  );
};

const generateBagIds = async (lotSize, tableNo) => {
  const data = {
    lotSize,
    tableNo,
  };
  return await callBackend(
    "POST",
    "routes/checking/bagId/generateBagIds",
    true,
    data
  );
};

const getBagData = async (filterDateFrom, filterDateTo) => {
  const data = {
    filterDateFrom,
    filterDateTo,
  };
  console.log(data);
  return await callBackend(
    "POST",
    "routes/checking/bagId/getUsedAndUnusedBagId",
    true,
    data
  );
};
const ResetPassword = async (username, password) => {
  const data = {
    username,
    password,
  };
  return await callBackend(
    "POST",
    "routes/admin/manageUser/resetPass",
    true,
    data
  );
};
const AddWorkerStitching = async (data) => {
  console.log(data);
  return await callBackend("POST", "routes/addWorkerStitching", true, data);
};
const AddWorkerChecking = async (data) => {
  console.log(data);
  return await callBackend("POST", "routes/addWorkerChecking", true, data);
};
const getMachineViolation = async (
  filterDateFrom,
  filterDateTo,
  machineId,
  shifts
) => {
  const data = {
    filterDateFrom,
    filterDateTo,
    machineId,
    shifts,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/machineBreakdownViolationtable",
    true,
    data
  );
};
const postMachineViolation = async (fromDate, toDate) => {
  try {
    var config = {
      method: "post",
      url: "http://3.23.114.42:8081/routes/KPI/violation/mechineVoilation",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        filterDateFrom: fromDate,
        filterDateTo: toDate,
      },
    };

    const response = await axios(config);
    console.log(response);
    return response.data.data;
  } catch {}
};

const detailedSummaryByWorkerChecking = async (fromDate, toDate) => {
  try {
    var config = {
      method: "post",
      url:
        "http://3.23.114.42:8081/routes/checking/KPI/home/detailedSummaryByWorker",
      headers: {},
      data: {
        filterDateFrom: fromDate,
        filterDateTo: toDate,
      },
    };

    const response = await axios(config);
    return response.data.detailedSummaryByWorker;
  } catch (e) {}
};

const detailedSummaryByClpCtrChecking = async (fromDate, toDate) => {
  try {
    var config = {
      method: "post",
      url:
        "http://3.23.114.42:8081/routes/checking/KPI/home/detailedSummaryByClpCtr",
      headers: {},
      data: {
        filterDateFrom: fromDate,
        filterDateTo: toDate,
      },
    };

    const response = await axios(config);
    return response.data.detailedSummaryByClpCtr.detailedSummaryByClpCtr;
  } catch (err) {}
};

const detailedSummaryByTableChecking = async (fromDate, toDate) => {
  try {
    var config = {
      method: "post",
      url:
        "http://3.23.114.42:8081/routes/checking/KPI/home/detailedSummaryByTable",
      headers: {},
      data: {
        filterDateFrom: fromDate,
        filterDateTo: toDate,
      },
    };

    const response = await axios(config);
    return response.data.detailedSummaryByTable;
  } catch (err) {}
};

const revokeUserAccess = async (username) => {
  const data = {
    username: username,
  };
  return await callBackend(
    "POST",
    "routes/admin/manageUser/revokeAccess",
    true,
    data
  );
};

const UnrevokeUserAccess = async (username) => {
  const data = {
    username: username,
  };
  return await callBackend(
    "POST",
    "routes/admin/manageUser/UnRevokeAccess",
    true,
    data
  );
};

const copyScheduleStitching = async () => {
  return await callBackend(
    "GET",
    "routes/stitching/schedule/updateAllSchedule"
  );
};
const copyScheduleChecking = async () => {
  return await callBackend("GET", "routes/checking/schedule/updateAllSchedule");
};

const communicatedTo = async (to, id, reason) => {
  const data = {
    communicatedTo: to,
    violationId: id,
    violationReason: reason,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/communicatedTo",
    true,
    data
  );
};

const updateStitchingWorkerSchedule = async (datas) => {
  const data = {
    date: datas.date,
    workerId: datas.workerId,
    shift: datas.shift,
    wing: datas.wing,
    machineId: datas.machineId,
    machineOnOffStatus: datas.machineOnOffStatus ? 1 : 0,
    id: datas.id,
  };
  return await callBackend(
    "POST",
    "routes/stitchigSheduleSingleUpdate/update",
    true,
    data
  );
};

const getCheckingWorkerData = async () => {
  return await callBackend("GET", "routes/checking/worker/all");
};

const getCheckingSchedule = async () => {
  return await callBackend("GET", "routes/checking/schedule/scheduleDetail");
};

const updateCheckingWorkerSchedule = async (datas) => {
  const data = {
    date: datas.date,
    workerId: datas.workerId,
    shift: datas.shift,
    wing: datas.wing,
    tableId: datas.tableId,
    id: datas.id,
  };
  return await callBackend(
    "POST",
    "routes/checkingSheduleSingleUpdate/update",
    true,
    data
  );
};

export {
  login,
  getViolation,
  getWorkerUtilization,
  homepageData,
  violationData,
  scheduleUpload,
  videoWallStitching,
  getYourData,
  homeDateFilter,
  machineData,
  violationDateFilter,
  workerUnavailableViolation,
  feedUnavailableViolation,
  crowdingViolation,
  violationByWorkerF,
  getViolationDetailData,
  violationComment,
  workerUtilizationData,
  crowdingInstanceData,
  summaryByViolationData,
  summaryByWorkerData,
  WORKER_UnavailableViolation,
  FEED_UnavailableViolation,
  videoWallChecking,
  stitchingAlert,
  loadStitchingAlertData,
  stitchingNotification,
  StitchingUserData,
  UpdateStitchingUserData,
  ClpCtrData,
  videoWallCutting,
  ctr_machineID,
  AddNewUser,
  ctrDropDown,
  changeCTR,
  crowdingViolationChecking,
  workerUnavailableViolationChecking,
  getStitchingNotification,
  loadTableId,
  removeNotification,
  crowdingInstanceCheckingData,
  machineBreakdownData,
  generateBagIds,
  getBagData,
  ResetPassword,
  AddWorkerStitching,
  AddWorkerChecking,
  getMachineViolation,
  postMachineViolation,
  detailedSummaryByWorkerChecking,
  detailedSummaryByClpCtrChecking,
  detailedSummaryByTableChecking,
  revokeUserAccess,
  UnrevokeUserAccess,
  copyScheduleStitching,
  copyScheduleChecking,
  communicatedTo,
  updateStitchingWorkerSchedule,
  getCheckingWorkerData,
  getCheckingSchedule,
  updateCheckingWorkerSchedule,
};
