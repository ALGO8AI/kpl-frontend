/* eslint-disable no-unused-vars */
const axios = require("axios");

// const localUrl = "http://localhost:5000";
// const cloudUrl = "http://kpl-checking.herokuapp.com"; //dev
const cloudUrl = "http://3.17.151.86:5000";
const cloudUrlVPN_TEMP = "http://120.120.120.147:7980"; //VPN

// const cloudUrl = "http://13.232.228.72:3000"; //prod
const videoWall = "http://kpl.algo8apps.com";

// const baseUrl = cloudUrlProd;
const baseUrl = cloudUrl;
// const baseUrl = "http://kpl.algo8apps.com:5006";

const getUrl = (path) => `${baseUrl}/${path}`;

const getConfig = (formData) => {
  const headers = {};
  // if (formData) headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (formData) headers["Content-Type"] = "multipart/form-data";

  return { headers };
};

const callBackendV2 = async (
  type,
  path,
  auth = true,
  body = {},
  formData = false
) => {
  try {
    const url = getUrl(path);
    let config = {};
    if (formData) config = getConfig(formData);
    switch (type) {
      case "GET": {
        const { data } = await axios.get(url, config);
        return data;
      }
      case "POST": {
        const { data } = await axios.post(url, body, config);
        return data;
      }
      case "PUT": {
        const { data } = await axios.put(url, body, config);
        return data;
      }
      case "DELETE": {
        const { data } = await axios.delete(url, config);
        return data;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

export { callBackendV2, videoWall };
