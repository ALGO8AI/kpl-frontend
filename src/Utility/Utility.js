export const modifyPrevDate = (date) =>
  `${
    +new Date(date).toLocaleDateString("en-GB").split("/")[0]?.length === 1
      ? +0 + new Date(date).toLocaleDateString("en-GB").split("/")[0]
      : new Date(date).toLocaleDateString("en-GB").split("/")[0]
  }-${
    +new Date(date).toLocaleDateString("en-GB").split("/")[1]?.length === 1
      ? +0 + new Date(date).toLocaleDateString("en-GB").split("/")[1]
      : new Date(date).toLocaleDateString("en-GB").split("/")[1]
  }-${new Date(date).toLocaleDateString("en-GB").split("/")[2]}`;

export const modifyPrevDate2 = (date) =>
  `${
    +new Date(date).toLocaleDateString("en-GB").split("/")[0]?.length === 1
      ? +0 + new Date(date).toLocaleDateString("en-GB").split("/")[0]
      : new Date(date).toLocaleDateString("en-GB").split("/")[0]
  }-${
    +new Date(date).toLocaleDateString("en-GB").split("/")[1]?.length === 1
      ? +0 + new Date(date).toLocaleDateString("en-GB").split("/")[1]
      : new Date(date).toLocaleDateString("en-GB").split("/")[1]
  }-${new Date(date).toLocaleDateString("en-GB").split("/")[2]}`;

export const convertToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const returnStatusDefect = (type) => {
  switch (type) {
    case "incorrect violation":
      return "Rejected";
    case "not known":
      return "Not Repaired";
    case "open":
      return "Not Repaired";
    case "okay bag":
      return "Okay Bag";
    case "closed":
      return "Repaired";
    default:
      return "Not Repaired";
  }
};

export const returnClassNameDefect = (type) => {
  switch (type) {
    case "incorrect violation":
      return "Link-btn-red";
    case "okay bag":
      return "Link-btn-yellow";
    case "rejected":
      return "Link-btn-red";
    case "not-repaired":
      return "Link-btn-orange";
    case "repaired":
      return "Link-btn-green";
    case "closed":
      return "Link-btn-blue";
    default:
      return "Link-btn-orange";
  }
};
