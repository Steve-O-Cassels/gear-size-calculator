import {chainRingCombinations} from '../config/config';
import difference from 'lodash/difference';
import clone from 'lodash/clone';
import isArray from 'lodash/isArray';
import some from 'lodash/some';
import map from 'lodash/map';

export default function validate(
  chainRings
){
  validateChainRings(chainRings);
  // validateCassette(cassette);
  // validateRimDiameter(rimDiameter);
  // validateTyreSize(tyreSize);
}

const validateChainRings = (chainRings) => {
  if(!isArray(chainRings) | chainRings.length !== 2){
    throw new Error(`Chainring combination must be an array of two chainrings.`);
  }
  const validChainRingCombinations = clone(chainRingCombinations);
  const result = map(validChainRingCombinations, (x) => {
    return difference(chainRings, x).length === 0;
  });
  if(!some(result, (x) => x === true)){
    throw new Error(`Chainring combination ${chainRings} is not supported.`);
  }
};
