const getMonthCode = (month: number): string | undefined => {
  return ["A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"][month];
};

export default getMonthCode;
