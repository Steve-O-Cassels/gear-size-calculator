import {cassetteCombinations as configCassetteCombinations, cassetteSpeeds as configCassetteSpeeds} from '../../config/config';
import isArray from 'lodash/isArray';
import difference from 'lodash/difference';
import some from 'lodash/some';
import map from 'lodash/map';
import flattenDeep from 'lodash/flattenDeep';

export default function validate(
  cassette,
  validCassetteCombinations = configCassetteCombinations,
  validCassetteSpeeds = configCassetteSpeeds
){
  const _validCassetteSpeeds = flattenDeep(validCassetteSpeeds);
  if(!isArray(cassette) | (!validCassetteSpeed(_validCassetteSpeeds, cassette.length)))
    throw new Error(`Invalid number of sprockets in the cassette, found ${cassette.length} but must be one of: ${_validCassetteSpeeds}.`);

  if(!validCassetteCombination(validCassetteCombinations, cassette)){
    throw new Error(`Cassette combination ${cassette} is not supported.`);
  }
}

const validCassetteSpeed = (validCassetteSpeeds, cassetteLength) => {
  return some(validCassetteSpeeds, (x) => x === cassetteLength);
};

const validCassetteCombination = (validCassetteCombinations, cassette) => {
  const results = map(validCassetteCombinations, (x) => {
    return difference(cassette, x).length === 0;
  });
  return some(results, (x) => x === true);
};
