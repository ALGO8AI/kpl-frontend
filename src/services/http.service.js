/* eslint-disable no-unused-vars */
const axios = require("axios");

// const localUrl = "http://localhost:5000";
// const cloudUrl = "http://3.18.22.89:3000"; //dev
const cloudUrlProd = "http://kpl.algo8apps.com:3000"; //dev
const clouUrlDev = "http://thawing-bayou-72580.herokuapp.com";
const cloudUrlTemp = "http://13.126.115.120:5000"; //temp
const cloudUrlVPN = "http://120.120.120.147:5000"; //VPN
const cloudUrlVPN_TEMP = "http://120.120.120.147:9205"; //VPN

// const cloudUrl = "http://13.232.228.72:3000"; //prod
const videoWall = "http://kpl.algo8apps.com";

// const baseUrl = cloudUrlProd;
const baseUrl = cloudUrlVPN_TEMP;
// const baseUrl = "http://kpl.algo8apps.com:5006";

const getUrl = (path) => `${baseUrl}/${path}`;

const getConfig = (formData) => {
  const headers = {};
  // if (formData) headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (formData) headers["Content-Type"] = "multipart/form-data";

  return { headers };
};

const callBackend = async (
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

export { callBackend, videoWall };
