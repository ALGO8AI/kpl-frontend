export const weekRange = () => {
  var myDate = new Date();
  var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
  return [
    newDateWeekBack.toISOString().slice(0, 10),
    myDate.toISOString().slice(0, 10),
  ];
};
