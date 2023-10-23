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

function getMinutes(data) {
  const getTime = data.split(':');
  const convertHoursToMinutes = (parseInt(getTime[0], 10)) * 60;
  const minutes = parseInt(getTime[1], 10);
  return convertHoursToMinutes + minutes;
}

function meetNotWorkingDay(startWork, finishWork, meet, meetDuration) {
  const startWorkMinutes = getMinutes(startWork);
  const finishWorkMinutes = getMinutes(finishWork);
  const meetMinutes = getMinutes(meet);
  const finishMeet = meetMinutes + meetDuration;

  return meetMinutes >= startWorkMinutes && finishMeet <= finishWorkMinutes;
}

console.log(meetNotWorkingDay('08:00', '17:30', '14:00', 90));
console.log(meetNotWorkingDay('8:0', '10:0', '8:0', 120));
console.log(meetNotWorkingDay('08:00', '14:30', '14:00', 90));
console.log(meetNotWorkingDay('14:00', '17:30', '08:0', 90));
console.log(meetNotWorkingDay('8:00', '17:30', '08:00', 900));
