import {
  checkDuplicate,
  clearStringGap,
  removeExtraSpaces,
  isProperString,
  isUrlPath,
  checkContinuous,
  checkInclude,
  isPw,
  isPwStrick,
} from "..";

test.each([
  ["ad sfas dfa12 414sdf", "adsfasdfa12414sdf"],
  [" a a a", "aaa"],
])('%#. clear string gap: "%s"', (str, result) => {
  expect(clearStringGap(str)).toBe(result);
});

test.each([
  ["ad sfas  dfa12   414sdf", "ad sfas dfa12 414sdf"],
  [" a a  a", " a a a"],
])('%#. remove extra spaces: "%s"', (str, result) => {
  expect(removeExtraSpaces(str)).toBe(result);
});

test.each([
  ["ad sfas  dfa12   414sdf", true],
  ["가나다라 마바사ㅁ", true],
  ["_!.ㄱㄴㄷ", false],
])('%#. is proper string: "%s"', (str, result) => {
  expect(isProperString(str)).toBe(result);
});

test.each([
  ["/interview", "interview", true],
  ["/interview/sdfa", "interview", true],
  ["/interview-test", "interview", false],
  ["/interview-test/asdf", "interview-test", true],
])('%#. interview path: "%s"', (str, pattern, result) => {
  expect(isUrlPath(str, pattern)).toBe(result);
});

test.each([
  ["adsfasdfa12 414sdf", undefined, false],
  ["111", undefined, true],
  ["aa a", 2, true],
  ["aa a", 3, false],
  ["bbb b", 4, false],
  ["AAAa", 4, false],
  ["AAAA", 4, true],
])('%#. check duplicate: "%s"', (str, dup, result) => {
  expect(checkDuplicate(str, dup)).toBe(result);
});

test.each([
  ["adsfasdfa12 414sdf", undefined, false],
  ["123", undefined, true],
  ["111", 3, false],
  ["abc", 2, true],
  ["abc", 4, false],
  ["ABCD", 4, true],
])('%#. check continuos: "%s"', (str, dup, result) => {
  expect(checkContinuous(str, dup)).toBe(result);
});

test.each([
  ["adsfasdfa12undefined 414sdf", ["undefined"], true],
  ["111", ["u", "11"], true],
  ["123sabcdefg", ["undefined", "abc"], true],
  ["ABCD", ["undefined"], false],
])('%#. check continuos: "%s"', (str, dup, result) => {
  expect(checkInclude(str, dup)).toBe(result);
});

test.each([
  ["adsfasdfa12undefined414sdf", [20, 30], true],
  ["1112..!as1df1", undefined, true],
  ["asds", [3, 4], true],
  ["assds", [3, 4], false],
])('%#. is pw: "%s"', (str, dup: [number, number], result) => {
  expect(isPw(str, dup)).toBe(result);
});

test.each([
  ["adsfasdfa12undeA!ned414sdf", [20, 30], true],
  ["adsfasdfa12undened414sdf", [20, 30], false],
  ["11A2..!as1df1", undefined, true],
  ["asds", [3, 4], false],
  ["Aa1.", [3, 4], true],
])('%#. is pw strick: "%s"', (str, dup: [number, number], result) => {
  expect(isPwStrick(str, dup)).toBe(result);
});
