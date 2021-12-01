export const Hours = (dt1, dt2) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;

  var totalSeconds = Math.abs(Math.round(diff));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return [`${hours}h`, `${minutes}m`, `${seconds}s`]
    .filter((item) => item[0] !== "0")
    .join(" ");
};
