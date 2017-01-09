import round from 'lodash/round';
import isNumber from 'lodash/isNumber';

export default function mmToInches(mm) {
  validateNumberToConvert(mm);
  const cm = mmToCm(mm);
  const inches = cm / 2.54;
  return round(inches, 2);
}

export function mmToCm(mm) {
  validateNumberToConvert(mm);
  return round((mm / 10), 2);
}

const validateNumberToConvert = (input) => {
  if ((input === undefined) | (!isNumber(input))) {
    throw new Error('mm must be an number');
  }
};
