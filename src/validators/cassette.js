import {cassetteCombinations, cassetteSpeeds} from '../../config/config';
import isArray from 'lodash/isArray';
import difference from 'lodash/difference';
import some from 'lodash/some';
import map from 'lodash/map';
import flattenDeep from 'lodash/flattenDeep';
import flatten from 'lodash/flatten';


export default function validate(cassette){
  const validCassetteSpeeds = flattenDeep(cassetteSpeeds);

  if(!isArray(cassette) | (!validCassetteSpeed(validCassetteSpeeds, cassette.length)))
    throw new Error(`Number of sprockets in the cassette was ${cassette.length} but must be one of: ${validCassetteSpeeds}.`);

  if(!validCassetteCombination(cassetteCombinations, cassette)){
    throw new Error(`Cassette combination ${cassette} is not supported.`);
  }
}

const validCassetteSpeed = (validCassetteSpeeds, cassetteLength) => {
  return some(validCassetteSpeeds, (x) => x === cassetteLength);
};

const validCassetteCombination = (cassetteCombinations, cassette) => {
  const validCassettes = flatten(cassetteCombinations);
  const results = map(validCassettes, (x) => {
    return difference(cassette, x).length === 0;
  });
  return some(results, (x) => x === true);
};
