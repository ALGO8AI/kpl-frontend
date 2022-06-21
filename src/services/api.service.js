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
    username: localStorage.getItem("kpl_username"),
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
  toDate,
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
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
    username: localStorage.getItem("kpl_username"),
  };
  console.log(data);
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
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/crowdingViolation",
    true,
    data
  );
};

const crowdingViolationChecking = async (
  fromDate,
  toDate,
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
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
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/violationByWorker",
    true,
    data
  );
};

const violationByWorkerFChecking = async (
  fromDate,
  toDate,
  ctr,
  table,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/violationByWorker",
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

const getYourData = async (data) => {
  const formData = {
    ...data,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend("POST", "routes/yourData", true, formData);
};

const getViolationDetailData = async (id) => {
  return await callBackend("POST", "routes/KPI/violation/getVolIdData", true, {
    volId: id,
  });
};

const getCheckingViolationDetailData = async (id) => {
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/getDataByVolId",
    true,
    {
      volId: id,
    }
  );
};

const violationComment = async (
  id,
  reason,
  action,
  isCorrect,
  isIncorrect,
  incorrect,
  actual,
  reassigned
) => {
  console.log(
    id,
    reason,
    action,
    isCorrect,
    isIncorrect,
    incorrect,
    actual,
    reassigned
  );
  return await callBackend("POST", "routes/KPI/violation/addComment", true, {
    violationId: id,
    violationReason: reason,
    action: action,
    confirmStatus: isCorrect,
    incorrectStatus: isIncorrect,
    incorrectViolationReason: incorrect,
    actualSupervisor: actual,
    reassignedSupervisor: reassigned,
  });
};
const violationCommentChecking = async (
  id,
  reason,
  action,
  isCorrect,
  isIncorrect,
  incorrect,
  actual,
  reassigned
) => {
  console.log(
    id,
    reason,
    action,
    isCorrect,
    isIncorrect,
    incorrect,
    actual,
    reassigned
  );
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/addComment",
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

const workerUtilizationData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  ctr,
  machine,
  shift
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shift,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/workerUtilization",
    true,
    data
  );
};
const checkingWorkerUtilizationData = async (
  fromDate,
  toDate,
  ctr,
  table,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  console.log(data);
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/workerUtilization",
    true,
    data
  );
};
const crowdingInstanceData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  shifts
) => {
  return await callBackend(
    "POST",
    "routes/KPI/home/crowdingInstanceData",
    true,
    {
      filterDateFrom: fromDate,
      filterDateTo: toDate,
      username: localStorage.getItem("kpl_username"),
      shifts,
    }
  );
};

const feedInstanceData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  ctr,
  machine,
  shift
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shift,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/feedUtilization",
    true,
    data
  );
};

const crowdingInstanceCheckingData = async (fromDate, toDate, shifts) => {
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/crowdingInstanceData",
    true,
    {
      filterDateFrom: fromDate,
      filterDateTo: toDate,
      shifts,
      username: localStorage.getItem("kpl_username"),
    }
  );
};

const summaryByViolationData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByViolation",
    true,
    data
  );
};

const summaryByWorkerData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByWorker",
    true,
    data
  );
};
const machineData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByMachineId",
    true,
    data
  );
};

const ClpCtrData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shifts,
    username: localStorage.getItem("kpl_username"),
  };

  return await callBackend(
    "POST",
    "routes/KPI/home/detailedSummaryByClpCtr",
    true,
    data
  );
};

export const ClpCtrDataChecking = async (
  fromDate,
  toDate,
  ctr,
  machine,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shifts,
    username: localStorage.getItem("kpl_username"),
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

const StitchingUserData = async (data) => {
  return await callBackend(
    "POST",
    "routes/admin/manageUser/getUser",
    true,
    data
  );
};
const ctr_machineID = async () => {
  return await callBackend("GET", "routes/KPI/home/clpctrAndMachineID");
};

const AddNewUser = async (data) => {
  // console.log(data);
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

const machineBreakdownData = async (
  fromDate = new Date().toISOString().slice(0, 10),
  toDate = new Date().toISOString().slice(0, 10),
  machine,
  shift
) => {
  const data = {
    machineId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts: shift,
    username: localStorage.getItem("kpl_username"),
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

const getBagData = async (filterDateFrom, filterDateTo, tableId) => {
  const data = {
    filterDateFrom,
    filterDateTo,
    tableId,
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
const getMachineBreakdown = async (
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
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/machineBreakdownViolationtable",
    true,
    data
  );
};
export const getMachineViolation = async (
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
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/machineViolationtable",
    true,
    data
  );
};
const postMachineViolation = async (fromDate, toDate) => {
  const data = {
    filterDateFrom: fromDate,
    filterDateTo: toDate,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/mechineVoilation",
    true,
    data
  );
  // try {
  //   var config = {
  //     method: "post",
  //     url: "http://3.23.114.42:3000/routes/KPI/violation/mechineVoilation",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: {
  //       filterDateFrom: fromDate,
  //       filterDateTo: toDate,
  //     },
  //   };

  //   const response = await axios(config);
  //   console.log(response);
  //   return response.data.data;
  // } catch {}
};

const detailedSummaryByWorkerChecking = async (
  fromDate,
  toDate,
  ctr,
  table,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/detailedSummaryByWorker",
    true,
    data
  );
  // try {
  //   var config = {
  //     method: "post",
  //     url:
  //       "http://3.23.114.42:3000/routes/checking/KPI/home/detailedSummaryByWorker",
  //     headers: {},
  //     data,
  //   };

  //   const response = await axios(config);
  //   return response.data.detailedSummaryByWorker;
  // } catch (e) {}
};

const detailedSummaryByClpCtrChecking = async (
  fromDate,
  toDate,
  ctr,
  table,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/detailedSummaryByClpCtrChecking",
    true,
    data
  );
  // try {
  //   var config = {
  //     method: "post",
  //     url:
  //       "http://3.23.114.42:3000/routes/checking/KPI/home/detailedSummaryByClpCtr",
  //     headers: {},
  //     data: {
  //       filterDateFrom: fromDate,
  //       filterDateTo: toDate,
  //       // tableId,
  //       // shifts,
  //     },
  //   };

  //   const response = await axios(config);
  //   return response.data.detailedSummaryByClpCtr.detailedSummaryByClpCtr;
  // } catch (err) {}
};

const detailedSummaryByTableChecking = async (
  fromDate,
  toDate,
  ctr,
  table,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/detailedSummaryByTable",
    true,
    data
  );
  // try {
  //   var config = {
  //     method: "post",
  //     url:
  //       "http://3.23.114.42:3000/routes/checking/KPI/home/detailedSummaryByTable",
  //     headers: {},
  //     data: {
  //       filterDateFrom: fromDate,
  //       filterDateTo: toDate,
  //     },
  //   };

  //   const response = await axios(config);
  //   return response.data.detailedSummaryByTable;
  // } catch (err) {}
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

const communicatedTo = async (to, id, reason, image, name) => {
  const data = {
    communicatedTo: to,
    violationId: id,
    violationReason: reason,
    image: image,
    userName: name,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/communicatedTo",
    true,
    data
  );
};

// const CheckingCommunicatedTo = async (to, id, reason) => {
//   const data = {
//     communicatedTo: to,
//     violationId: id,
//     violationReason: reason,
//   };
//   return await callBackend(
//     "POST",
//     "routes/KPI/violation/communicatedTo",
//     true,
//     data
//   );
// };

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

const getCheckingSchedule = async (formData) => {
  console.log("formData", formData);
  return await callBackend(
    "POST",
    "routes/checking/schedule/scheduleDetail",
    true,
    {
      wing: localStorage.getItem("kpl_wing"),
    }
  );
};

const updateCheckingWorkerSchedule = async (datas) => {
  const data = {
    date: datas.date,
    workerId: datas.workerId,
    shift: datas.shift,
    wing: datas.wing,
    tableId: datas.tableId,
    id: datas.id,
    tableOnOff: datas.tableOnOff ? 1 : 0,
  };
  return await callBackend(
    "POST",
    "routes/checkingSheduleSingleUpdate/update",
    true,
    data
  );
};

const getForgetPasswordLink = async (data) => {
  var config = {
    method: "post",
    url: "http://3.23.114.42:3000/routes/auth",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
  // console.log(data);
  // return await callBackend("POST", "routes/auth", true, data);
};

const getNotificationLog = async (filterDateFrom, filterDateTo) => {
  const data = {
    filterDateFrom,
    filterDateTo,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/yourData/notificationLog",
    true,
    data
  );
};

const getNotificationLogChecking = async (filterDateFrom, filterDateTo) => {
  const data = {
    filterDateFrom,
    filterDateTo,
  };
  return await callBackend("POST", "routes/checking/notifLog", true, data);
};

const updatePassword = async (data) => {
  var config = {
    method: "post",
    url: "http://3.23.114.42:3000/routes/auth/updatePassword",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
};

const getStitchingSupervisorSchedule = async (data) => {
  return await callBackend(
    "POST",
    "routes/stitching/supervisorSchedule/all",
    true,
    data
  );
};

const getStitchingSupervisorCopy = async () => {
  return await callBackend(
    "GET",
    "routes/stitchingSupervisorSchedule/updateAllSchedule"
  );
};

const addStitchingSupervisorSingle = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/stitchingSupervisorSchedule/addSingle",
    true,
    data
  );
};

const updateStitchingSupervisorSingle = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/stitchingSupervisorSchedule/updateSingle",
    true,
    data
  );
};

const getCheckingSupervisorSchedule = async (formData) => {
  return await callBackend(
    "POST",
    "routes/checking/supervisorSchedule/all",
    true,
    formData
  );
};

const getCheckingSupervisorCopy = async () => {
  return await callBackend(
    "GET",
    "routes/CheckingSupervisorSchedule/updateAllSchedule"
  );
};

const addCheckingSupervisorSingle = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/checkingSupervisorSchedule/addSingle",
    true,
    data
  );
};

const updateCheckingSupervisorSingle = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/checkingSupervisorSchedule/updateSingle",
    true,
    data
  );
};

const workerUpdateChecking = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/addWorkerChecking/update",
    true,
    data
  );
};
const workerDeleteChecking = async (datas) => {
  const data = datas;
  console.log(datas);
  return await callBackend(
    "POST",
    "routes/addWorkerChecking/delete",
    true,
    data
  );
};

const workerUpdateStitching = async (datas) => {
  const data = datas;
  return await callBackend(
    "POST",
    "routes/addWorkerStitching/update",
    true,
    data
  );
};
const workerDeleteStitching = async (datas) => {
  const data = datas;
  console.log(datas);
  return await callBackend(
    "POST",
    "routes/addWorkerStitching/delete",
    true,
    data
  );
};

const analyticsTotalViolation = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/totalViolations",
    true,
    data
  );
};

const analyticsTotaUnresolvedlViolation = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/totalUnresolvedViolations",
    true,
    data
  );
};

const analyticsMostUnresolvedlViolation = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/mostUnresolvedViolations",
    true,
    data
  );
};

const analyticsMostUnresolvedlViolationInstance = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/mostUnresolvedViolationByInstance",
    true,
    data
  );
};

const analyticsTotalViolationByType = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/totalViolationByType",
    true,
    data
  );
};

const analyticsMaxVioCount = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/maxViolationCounts",
    true,
    data
  );
};

const analyticsDurationOfViolationType = async (
  currentDate,
  wing,
  line,
  shift,
  supervisor
) => {
  const data = {
    currentDate,
    wing,
    line,
    shift,
    supervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/durationOfViolationByType",
    true,
    data
  );
};

const analyticsMachineStatus = async (
  currentDate,
  wing,
  line,
  shift,
  supervisor,
  machineId
) => {
  const data = {
    currentDate,
    wing,
    line,
    shift,
    supervisor,
    machineId,
  };
  console.log(data);

  return await callBackend(
    "POST",
    "routes/KPI/analytics/machineStatus",
    true,
    data
  );
};

const analyticsMachineStatusByDuration = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor,
  machineId
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
    machineId,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/machineStatusByDuration",
    true,
    data
  );
};

const analyticsMachineStatusByDurationAndMachineID = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor,
  machineId
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
    machineId,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/machineStatusByDurationAndMachineId",
    true,
    data
  );
};

const analyticsMachineStatusByOperation = async (
  filterDateTo,
  filterDateFrom,
  wing,
  line,
  shift,
  supervisor,
  machineId
) => {
  const data = {
    filterDateTo,
    filterDateFrom,
    wing,
    line,
    shift,
    supervisor,
    machineId,
  };
  return await callBackend(
    "POST",
    "routes/KPI/analytics/machineStatusByDurationAndMachineIdUtilization",
    true,
    data
  );
};

const getAllSupervisorList = async () => {
  return await callBackend("POST", "routes/supervisor/allSupervisors", true);
};

const getAllWorketrList = async () => {
  return await callBackend("GET", "routes/stitching/worker/allWorker");
};

const getAllWorketrListChecking = async () => {
  return await callBackend("GET", "routes/checking/worker/all");
};

const defectsViolation = async (fromDate, toDate, ctr, tableId, shifts) => {
  const data = {
    clpctr: ctr,
    tableId: tableId,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/defectViolationData",
    true,
    data
  );
};

export const productionSummary = async (
  fromDate,
  toDate,
  ctr,
  tableId,
  shifts
) => {
  const data = {
    clpctr: ctr,
    tableId: tableId,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/allDefectViolationData",
    true,
    data
  );
};

const getCurrentCTR = async () => {
  return await callBackend("GET", "routes/ctr/currentCLPCTR");
};

const getUnassignedCLPCTR = async () => {
  return await callBackend("GET", "routes/ctr/allUnassignedCLPCTR");
};

const updateCTR = async (data) => {
  return await callBackend("POST", "routes/ctr/updateCTR", true, data);
};

const closeCTR = async (data) => {
  return await callBackend("POST", "routes/ctr/closeCTR", true, data);
};

const getTailorDetails = async () => {
  return await callBackend("GET", "routes/checking/tailor");
};

const addTailor = async (name, id) => {
  const data = {
    tailorName: name,
    tailorId: id,
    img: "",
  };
  return await callBackend("POST", "routes/checking/tailor/add", true, data);
};

const updateTailor = async (name, id) => {
  const data = {
    tailorName: name,
    tailorId: id,
    img: "",
  };
  return await callBackend("POST", "routes/checking/tailor/update", true, data);
};

const deleteTailor = async (name, Tid, id) => {
  const data = {
    tailorName: name,
    tailorId: Tid,
    id: id,
  };
  return await callBackend("POST", "routes/checking/tailor/delete", true, data);
};

const defectChartData = async (fromDate, toDate, ctr, table, shifts) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/defectKPI",
    true,
    data
  );
};

const violationSupervisorUpdate = async (volId, supervisorName) => {
  const data = {
    volId,
    supervisorName,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/updateSupervisorByvolId",
    true,
    data
  );
};

const violationClosedByUpdate = async (volId, closedBySupervisor) => {
  const data = {
    volId,
    closedBySupervisor,
  };
  return await callBackend(
    "POST",
    "routes/KPI/violation/violationClosedBy",
    true,
    data
  );
};

const checkingViolationSupervisorUpdate = async (volId, supervisorName) => {
  const data = {
    volId,
    supervisorName,
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/updateSupervisorByvolId",
    true,
    data
  );
};

const checkingViolationClosedByUpdate = async (volId, closedBySupervisor) => {
  const data = {
    volId,
    closedBySupervisor,
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/violationClosedBy",
    true,
    data
  );
};

const checkingHomeWorker = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    tableId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/byWorker",
    true,
    data
  );
};

const checkingHomeDate = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    tableId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/byDate",
    true,
    data
  );
};

const checkingHomeByTable = async (fromDate, toDate, ctr, machine, shifts) => {
  const data = {
    clpctr: ctr,
    tableId: machine,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/byTable",
    true,
    data
  );
};

const getRecentCheckingUnavailable = async () => {
  return await callBackend(
    "GET",
    "routes/checking/KPI/violation/workerUnavRecentIncidents"
  );
};

const getRecentCheckingDefect = async () => {
  return await callBackend(
    "GET",
    "routes/checking/KPI/violation/defectRecentIncidents"
  );
};

const getRecentCheckingCrowd = async () => {
  return await callBackend(
    "GET",
    "routes/checking/KPI/violation/crowdingRecentIncidents"
  );
};

const getAllTableId = async () => {
  return await callBackend("GET", "routes/checking/KPI/violation/allTableID");
};

const deleteBarCode = async (bags) => {
  const data = {
    bagIds: bags,
  };
  console.log(data);
  return await callBackend(
    "POST",
    "routes/checking/bagId/deleteBagId",
    true,
    data
  );
};

const addStitchingWorkerSchedule = async (form) => {
  const formData = {
    data: form,
  };
  return await callBackend(
    "POST",
    "routes/stitchigSheduleSingleUpdate/add",
    true,
    formData
  );
};

const addCheckingWorkerSchedule = async (form) => {
  const formData = {
    data: form,
  };
  return await callBackend(
    "POST",
    "routes/checkingSheduleSingleUpdate/add",
    true,
    formData
  );
};

const tailorSummary = async (fromDate, toDate, ctr, table, shifts) => {
  const data = {
    clpctr: ctr,
    tableId: table,
    filterDateFrom: fromDate,
    filterDateTo: toDate,
    shifts,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackend(
    "POST",
    "routes/checking/KPI/violation/tailorSummary",
    true,
    data
  );
};

const getFabricList = async () => {
  return await callBackend(
    "GET",
    "routes/cutting/KPI/home/distinctFabricCategory"
  );
};

export const deleteCheckingWorkerSchedule = async (data) => {
  return await callBackend(
    "POST",
    "routes/addScheduleDetailChecking/delete",
    true,
    data
  );
};

export const deleteCheckingSupervisorSchedule = async (data) => {
  return await callBackend(
    "POST",
    "routes/checkingSupervisorSchedule/deleteSupervisor",
    true,
    data
  );
};

export const deleteStitchingSupervisorSchedule = async (data) => {
  return await callBackend(
    "POST",
    "routes/stitching/supervisorSchedule/delete",
    true,
    data
  );
};

export const deleteStitchingWorkerSchedule = async (data) => {
  return await callBackend(
    "POST",
    "routes/addScheduleDetailStitching/delete",
    true,
    data
  );
};

export const getLiveMachine = async () => {
  return await callBackend("GET", "routes/KPI/home/liveMachineStatus");
};

export const getDynamicMachineList = async (data) => {
  return await callBackend("POST", "routes/KPI/home/machineId", true, data);
};

export const getDynamicTableList = async (data) => {
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/tableId",
    true,
    data
  );
};

export const getDynamicClpCtrList = async (data) => {
  return await callBackend("POST", "routes/KPI/home/clpctr", true, data);
};

export const getDynamicClpCtrListChecking = async (data) => {
  return await callBackend(
    "POST",
    "routes/checking/KPI/home/clpctr",
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
  getMachineBreakdown,
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
  getForgetPasswordLink,
  getNotificationLog,
  updatePassword,
  getStitchingSupervisorSchedule,
  getStitchingSupervisorCopy,
  addStitchingSupervisorSingle,
  updateStitchingSupervisorSingle,
  getCheckingSupervisorSchedule,
  getCheckingSupervisorCopy,
  addCheckingSupervisorSingle,
  updateCheckingSupervisorSingle,
  workerUpdateChecking,
  workerDeleteChecking,
  workerUpdateStitching,
  workerDeleteStitching,
  analyticsTotalViolation,
  analyticsTotaUnresolvedlViolation,
  analyticsMostUnresolvedlViolation,
  analyticsMostUnresolvedlViolationInstance,
  analyticsTotalViolationByType,
  analyticsMaxVioCount,
  analyticsDurationOfViolationType,
  analyticsMachineStatus,
  analyticsMachineStatusByDuration,
  analyticsMachineStatusByDurationAndMachineID,
  analyticsMachineStatusByOperation,
  feedInstanceData,
  checkingWorkerUtilizationData,
  getAllSupervisorList,
  getAllWorketrList,
  defectsViolation,
  getCurrentCTR,
  getUnassignedCLPCTR,
  updateCTR,
  closeCTR,
  getTailorDetails,
  addTailor,
  updateTailor,
  deleteTailor,
  defectChartData,
  violationSupervisorUpdate,
  violationClosedByUpdate,
  checkingHomeWorker,
  getCheckingViolationDetailData,
  checkingHomeDate,
  checkingViolationSupervisorUpdate,
  checkingHomeByTable,
  getRecentCheckingUnavailable,
  getNotificationLogChecking,
  violationCommentChecking,
  getRecentCheckingDefect,
  getRecentCheckingCrowd,
  checkingViolationClosedByUpdate,
  getAllTableId,
  violationByWorkerFChecking,
  deleteBarCode,
  addStitchingWorkerSchedule,
  addCheckingWorkerSchedule,
  tailorSummary,
  getFabricList,
  getAllWorketrListChecking,
};
