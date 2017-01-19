import {chainRingCombinations} from '../../config/config';
import difference from 'lodash/difference';
import isArray from 'lodash/isArray';
import some from 'lodash/some';
import map from 'lodash/map';

export default function validate(chainRings){
  if(!isArray(chainRings) | chainRings.length !== 2){
    throw new Error(`Chainring combination must be an array of two chainrings.`);
  }
  const results = map(chainRingCombinations, (x) => {
    return difference(chainRings, x).length === 0;
  });
  if(!some(results, (x) => x === true)){
    throw new Error(`Chainring combination ${chainRings} is not supported.`);
  }
}
