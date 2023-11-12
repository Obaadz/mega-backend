export default () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Get the last 2 digits of the year
  const day = String(now.getDate()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  const random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  return `${year}${day}${minute}${second}${random}`;
};
