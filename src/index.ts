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

export const getByteLength = (str: string): number => {
  let b, i, c;
  for (b = i = 0; (c = str.charCodeAt(i++)); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
  return b;
};

export const isProperString = (str: string): boolean => {
  const regExp = /^[ㄱ-ㅎㅏ-ㅣ0-9!"#$%&'()*+,-./:;<=>?@[\]\\^_`{|}~\s]*$/i;

  return !regExp.test(str);
};

export const isUrlPath = (str: string, urlPattern: string): boolean => {
  const regExp = new RegExp("^[/](" + urlPattern + ")$");
  const regExpExtend = new RegExp("^[/](" + urlPattern + ")[/]");

  return regExp.test(str) || regExpExtend.test(str);
};

export const isName = (str: string, nameLength?: [number, number]): boolean => {
  const minLength = nameLength ? nameLength[0] : 2;
  const maxLength = nameLength ? nameLength[1] : 16;

  if (str.length < minLength || str.length > maxLength) return false;

  const regExp = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{1,}$/i;

  return regExp.test(str);
};

export const isEmail = (str: string): boolean => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return regExp.test(str);
};

export const isPw = (str: string, pwLength?: [number, number]): boolean => {
  const minLength = pwLength ? pwLength[0] : 8;
  const maxLength = pwLength ? pwLength[1] : 16;

  if (str.length < minLength || str.length > maxLength) return false;

  const regExp = /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[＼\]^_`{|}~\\)]{1,}$/i;

  return regExp.test(str);
};

export const isPwStrick = (
  str: string,
  pwLength?: [number, number]
): boolean => {
  const regLower = /[a-z]/g;
  const regUpper = /[A-Z]/g;
  const regNum = /[0-9]/g;
  const regSpe = /[!\\"#$%&'()*+,-./:;<=>?@\\[＼\]^_`\\{|\\}~\\)]+/gi;

  return (
    str.search(regLower) >= 0 &&
    str.search(regUpper) >= 0 &&
    str.search(regNum) >= 0 &&
    str.search(regSpe) >= 0 &&
    isPw(str, pwLength)
  );
};

export const checkDuplicate = (str: string, max?: number) => {
  let i = 1;
  let regStr = "(\\w)";

  while (i < (max ? max : 3)) {
    regStr += "\\1";
    i++;
  }

  const regExp = new RegExp(regStr);

  return regExp.test(str);
};

export const checkContinuous = (str: string, max?: number): boolean => {
  if (!max) max = 3; // 글자수를 지정하지 않으면 3로 지정

  let i: number, j: number, x: string;

  const buff: string[] = [
    "0123456789",
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ];

  let src: string;
  let ptn = "";

  for (i = 0; i < buff.length; i++) {
    src = buff[i] + buff[i]; // 01234567890123456789
    for (j = 0; j < buff[i].length; j++) {
      x = src.substr(j, max); // 0123
      ptn += x + "|";
    }
  }

  const regPtn = new RegExp(ptn.replace(/.$/, ""));

  return regPtn.test(str);
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
  return regExp.test(str) || str.length === 0;
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

export const jsonParseRepeater = (str: string, n: number): any => {
  let parsedJson: any = str;

  for (let i = 0; i < n; i++) {
    if (!isJson(parsedJson)) break;
    parsedJson = JSON.parse(parsedJson);
  }

  return parsedJson;
};

export const priceString = (price: number): string => {
  const priceString: string = price.toFixed();
  const strArr: string[] = [];

  let i;
  for (i = 3; i < priceString.length; i += 3)
    strArr.unshift(priceString.substr(priceString.length - i, 3));
  strArr.unshift(priceString.substr(0, priceString.length - i + 3));

  return strArr.join(",");
};
