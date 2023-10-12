const checkStringLength = (currentLine, length) => currentLine.length <= length;
checkStringLength('проверяемая строка', 21);

function isStringPalindrome(string) {
  const stringNormal = string.toLowerCase().replaceAll(' ', '');

  let stringReverse = '';
  for (let i = stringNormal.length - 1; i >= 0; i--) {
    stringReverse += stringNormal[i];
  }
  return stringNormal === stringReverse;
}
isStringPalindrome('Лёша на полке клопа нашёл ');

function extractNumber(arg) {
  const string = arg.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}
extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
