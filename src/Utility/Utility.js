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
