// write a custom hook called useDate
// it should return the current date in the format: month xth year

const useDate = (date) => {
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleString("default", { month: "long" });
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${month} ${day}th ${year}`;
};

export default useDate;
