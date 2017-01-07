require('babel-polyfill');
import _ from 'lodash/math';

const mmToInches = (mm) => {
  const cm = mmToCm(mm);
  const inches = cm / 2.54;
  return _.round(inches, 2);
};

const mmToCm = (mm) => {
  return _.round((mm / 10), 2);
};

export {
  mmToCm,
  mmToInches
};
