require('babel-polyfill');
import round from 'lodash/round';
import isNumber from 'lodash/isNumber';

const mmToInches = (mm) => {
  isValidNumberToConvert(mm);
  const cm = mmToCm(mm);
  const inches = cm / 2.54;
  return round(inches, 2);
};

const mmToCm = (mm) => {
  isValidNumberToConvert(mm);
  return round((mm / 10), 2);
};

const isValidNumberToConvert = (input) => {
  if ((input === undefined) | (!isNumber(input))) {
    throw new Error('mm must be an number');
  }
};
export {
  mmToCm,
  mmToInches
};
