export const convertDateToUnixTimestamp = (date: Date): number => {
  return Math.floor(date.getTime());
};

export const convertUnixTimestampToDate = (unixTimestamp: number): String => {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds).toLocaleDateString();
};

export const createDate = (
  date: Date | string,
  days: number = 0,
  weeks: number = 0,
  months: number = 0,
  years: number = 0,
) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);

  return newDate;
};
