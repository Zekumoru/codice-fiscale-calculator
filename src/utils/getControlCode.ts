const codeCharacters: Record<
  string,
  { odd: number; even: number } | undefined
> = {
  "0": { odd: 1, even: 0 },
  "1": { odd: 0, even: 1 },
  "2": { odd: 5, even: 2 },
  "3": { odd: 7, even: 3 },
  "4": { odd: 9, even: 4 },
  "5": { odd: 13, even: 5 },
  "6": { odd: 15, even: 6 },
  "7": { odd: 17, even: 7 },
  "8": { odd: 19, even: 8 },
  "9": { odd: 21, even: 9 },
  A: { odd: 1, even: 0 },
  B: { odd: 0, even: 1 },
  C: { odd: 5, even: 2 },
  D: { odd: 7, even: 3 },
  E: { odd: 9, even: 4 },
  F: { odd: 13, even: 5 },
  G: { odd: 15, even: 6 },
  H: { odd: 17, even: 7 },
  I: { odd: 19, even: 8 },
  J: { odd: 21, even: 9 },
  K: { odd: 2, even: 10 },
  L: { odd: 4, even: 11 },
  M: { odd: 18, even: 12 },
  N: { odd: 20, even: 13 },
  O: { odd: 11, even: 14 },
  P: { odd: 3, even: 15 },
  Q: { odd: 6, even: 16 },
  R: { odd: 8, even: 17 },
  S: { odd: 12, even: 18 },
  T: { odd: 14, even: 19 },
  U: { odd: 16, even: 20 },
  V: { odd: 10, even: 21 },
  W: { odd: 22, even: 22 },
  X: { odd: 25, even: 23 },
  Y: { odd: 24, even: 24 },
  Z: { odd: 23, even: 25 },
};

const getControlCode = (str: string) => {
  let sum = 0;
  str.split("").forEach((ch, index) => {
    if (index % 2) {
      // even
      sum += codeCharacters[ch]?.even ?? 0;
    } else {
      // odd
      sum += codeCharacters[ch]?.odd ?? 0;
    }
  });
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(sum % 26);
};

export default getControlCode;
