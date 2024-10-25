export const makeComma = (x: number) => {
  if (!x) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const makeDashboardText = (x: number, y?: number) => {
  let str = "";
  if (x >= 0) {
    str += makeComma(x);
  } else {
    str += "-";
  }

  if (y === undefined) return str;

  str += " / ";

  if (y >= 0) {
    str += makeComma(y);
  } else {
    str += "-";
  }

  return str;
};
