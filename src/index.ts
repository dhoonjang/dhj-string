export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const clearStringGap = (str: string): string => {
  return str.replace(/(\s*)/g, "");
};

export const removeExtraSpaces = (str: string): string => {
  return str.replace(/\s{2,}/g, " ");
};

export const getByteLength = (str: string) => {
  let b, i, c;
  for (b = i = 0; (c = str.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
};

export const isName = (str: string): boolean => {
  const regExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{3,16}$/;
  return regExp.test(str);
};

export const isEmail = (str: string): boolean => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(str);
};

export const isPw = (str: string): boolean => {
  const regExp = /^[a-zA-Z0-9!\\"#$%&'()*+,-./:;<=>?@\\[＼\]^_`\\{|\\}~\\)]{8,16}$/i;
  return regExp.test(str);
};

export const isPwStrick = (str: string): boolean => {
  const regLower = /[a-z]/g;
  const regUpper = /[A-Z]/g;
  const regNum = /[0-9]/g;
  const regSpe = /[!\\"#$%&'()*+,-./:;<=>?@\\[＼\]^_`\\{|\\}~\\)]+/gi;

  return (
    str.search(regLower) >= 0 &&
    str.search(regUpper) >= 0 &&
    str.search(regNum) >= 0 &&
    str.search(regSpe) >= 0 &&
    isPw(str)
  );
};

export const checkDuplicate = (str: string) => {
  const regExp = /(\w)\1\1/;

  return regExp.test(str);
};

export const checkContinuous = (str: string, max?: number) => {
  if (!max) max = 3; // 글자수를 지정하지 않으면 3로 지정
  let i, j, x, y;

  const buff = [
    "0123456789",
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ];

  let src,
    src2,
    ptn: RegExp | string = "";

  for (i = 0; i < buff.length; i++) {
    src = buff[i]; // 0123456789
    src2 = buff[i] + buff[i]; // 01234567890123456789
    for (j = 0; j < src.length; j++) {
      x = src.substr(j, 1); // 0
      y = src2.substr(j, max); // 0123
      ptn += "[" + x + "]{" + max + ",}|"; // [0]{4,}|0123|[1]{4,}|1234|...
      ptn += y + "|";
    }
  }

  ptn = new RegExp(ptn.replace(/.$/, "")); // 맨마지막의 글자를 하나 없애고 정규식으로 만든다.

  return ptn.test(str);
};

export const checkInclude = (str: string, checkArray: string[]): boolean => {
  let isInclude = false;

  checkArray.some((s) => {
    if (str.includes(s)) isInclude = true;
    return str.includes(s);
  });

  return isInclude;
};

export const isNumber = (str: string): boolean => {
  const regExp = /^[0-9\b]+$/;
  return regExp.test(str);
};

export const isArrayEqual = (a: unknown[], b: unknown[]): boolean => {
  let result = true;

  if (a.length !== b.length) return false;

  a.some((av) => {
    if (b.findIndex((bv) => bv === av) < 0) result = false;
    return b.findIndex((bv) => bv === av) < 0;
  });

  return result;
};

export const json2Parse = (str: string) => {
  return JSON.parse(JSON.parse(str));
};

export const priceToString = (price: number): string => {
  if (price < 1000) return `${price.toFixed()}`;
  const thousands = Math.floor(price / 1000);
  let units = "000";
  if (price - thousands * 1000 !== 0)
    units = (price - thousands * 1000).toFixed();
  return `${thousands},${units}`;
};
