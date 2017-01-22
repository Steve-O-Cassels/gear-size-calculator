import {chainRingCombinations as configChainRingCombinations} from '../../config/config';
import difference from 'lodash/difference';
import isArray from 'lodash/isArray';
import some from 'lodash/some';
import map from 'lodash/map';

export default function validate(
  chainRings,
  validChainRingCombinations = configChainRingCombinations){
  if(!isArray(chainRings) | (!validNumberOfChainrings(validChainRingCombinations, chainRings))){
    throw new Error(`Invalid number of chainrings.`);
  }
  if(!validChainRings(validChainRingCombinations, chainRings)){
    throw new Error(`Chainring combination ${chainRings} is not supported.`);
  }
}

const validChainRings = (chainRingCombinations, chainRings) => {
  const results = map(chainRingCombinations, (x) => {
    return difference(chainRings, x).length === 0;
  });
  return some(results, (x) => x === true);
};

const validNumberOfChainrings = (chainRingCombinations, chainRings) => {
  const results = map(chainRingCombinations, (x) => {
    return x.length == chainRings.length;
  });
  return some(results, (x) => x === true);
};
