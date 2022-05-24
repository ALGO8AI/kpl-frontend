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
