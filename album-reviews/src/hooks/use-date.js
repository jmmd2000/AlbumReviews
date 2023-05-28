// This hook takes a date and returns a formatted date string.

const useDate = (date) => {
  const parsedDate = new Date(date);
  const month = parsedDate.toLocaleString("default", { month: "long" });
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${month} ${day}th ${year}`;
};

export default useDate;
