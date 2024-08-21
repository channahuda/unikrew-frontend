const convertSalaryMonthToString = (serial: number) => {
  const utc_days = Math.floor(serial - 25569); // Excel serial date starts at 25569 days since 1970-01-01
  const utc_value = utc_days * 86400; // Convert days to seconds
  const monthToDate = new Date(utc_value * 1000);
  const formattedMonth = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(monthToDate); // Format as "January 2024", etc.
  return formattedMonth;
};

export { convertSalaryMonthToString };
