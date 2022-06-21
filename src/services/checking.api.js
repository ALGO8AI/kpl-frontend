import { callBackendV2 } from "./http.servicev2";

export const checkingManageRoles = async (data) => {
  return await callBackendV2(
    "POST",
    "routes/admin/manageUser/getUser",
    true,
    data
  );
};

export const homeDefectChart = async (data) => {
  const formField = {
    ...data,
    username: localStorage.getItem("kpl_username"),
  };
  return await callBackendV2(
    "POST",
    "routes/checking/KPI/home/defectsPercentage",
    true,
    formField
  );
};

export const getCheckingViolationDetailDataV3 = async (id) => {
  return await callBackendV2(
    "POST",
    "routes/checking/KPI/violation/getDataByVolId",
    true,
    {
      volId: id,
    }
  );
};

export const getCheckingWorkerDataV3 = async () => {
  return await callBackendV2("GET", "routes/checking/worker/all");
};

export const workerUpdateCheckingV3 = async (datas) => {
  const data = datas;
  return await callBackendV2(
    "POST",
    "routes/addWorkerChecking/update",
    true,
    data
  );
};

export const AddWorkerCheckingV3 = async (data) => {
  console.log(data);
  return await callBackendV2("POST", "routes/addWorkerChecking", true, data);
};

export const workerDeleteCheckingV3 = async (datas) => {
  const data = datas;
  return await callBackendV2(
    "POST",
    "routes/addWorkerChecking/delete",
    true,
    data
  );
};

export const getTailorDetailsV3 = async () => {
  return await callBackendV2("GET", "routes/checking/tailor");
};

export const addTailorV3 = async (name, id) => {
  const data = {
    tailorName: name,
    tailorId: id,
    img: "",
  };
  return await callBackendV2("POST", "routes/checking/tailor/add", true, data);
};

export const updateTailorV3 = async (name, id) => {
  const data = {
    tailorName: name,
    tailorId: id,
    img: "",
  };
  return await callBackendV2(
    "POST",
    "routes/checking/tailor/update",
    true,
    data
  );
};

export const deleteTailorV3 = async (name, Tid, id) => {
  const data = {
    tailorName: name,
    tailorId: Tid,
    id: id,
  };
  return await callBackendV2(
    "POST",
    "routes/checking/tailor/delete",
    true,
    data
  );
};

export const getCheckingSupervisorScheduleV3 = async (formData) => {
  return await callBackendV2(
    "POST",
    "routes/checking/supervisorSchedule/all",
    true,
    formData
  );
};

export const getCheckingSupervisorCopyV3 = async () => {
  return await callBackendV2(
    "GET",
    "routes/CheckingSupervisorSchedule/updateAllSchedule"
  );
};

export const addCheckingSupervisorSingleV3 = async (datas) => {
  const data = datas;
  return await callBackendV2(
    "POST",
    "routes/checkingSupervisorSchedule/addSingle",
    true,
    data
  );
};

export const updateCheckingSupervisorSingleV3 = async (datas) => {
  const data = datas;
  return await callBackendV2(
    "POST",
    "routes/checkingSupervisorSchedule/updateSingle",
    true,
    data
  );
};

export const deleteCheckingSupervisorScheduleV3 = async (data) => {
  return await callBackendV2(
    "POST",
    "routes/checkingSupervisorSchedule/deleteSupervisor",
    true,
    data
  );
};

export const getAllSupervisorListV3 = async () => {
  return await callBackendV2("POST", "routes/supervisor/allSupervisors", true);
};

export const saveWorkerScheduleV3 = async (data) => {
  return await callBackendV2(
    "POST",
    "routes/addScheduleDetailChecking/addSchedule",
    true,
    data
  );
};

export const copyWorkerScheduleV3 = async () => {
  return await callBackendV2(
    "GET",
    "routes/addScheduleDetailChecking/copyTable"
  );
};

export const bagCount = async () => {
  return await callBackendV2(
    "POST",
    "routes/checking/bagId/tableWiseRemainingBagIdCount",
    true,
    {
      wing: localStorage.getItem("kpl_wing"),
    }
  );
};

export const createBarcodeV2 = async (formData) => {
  return await callBackendV2(
    "POST",
    "routes/checking/bagId/autoGenerateBagId",
    true,
    formData
  );
};
