const axios = require("axios");

// const localUrl = "";
const cloudUrl = "http://3.23.114.42:3000"; //dev
// const cloudUrl = "http://13.232.228.72:3000"; //prod
const videoWall = "http://13.232.228.72";

const baseUrl = cloudUrl;

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
