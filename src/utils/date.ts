export const createDateTimeLocalString = (
  date: Date,
  { seconds = false, miliseconds = false } = {},
) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  const milisecond = String(date.getMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day}T${hour}:${minute}${
    seconds ? `:${second}` : ""
  }${miliseconds ? `.${milisecond}` : ""}`;
};
