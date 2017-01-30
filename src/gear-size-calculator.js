import gearSize from './gear-size';
import { wheelDiameter } from './wheel-dimensions';
// import ConvertUnit from './convert-unit';
import validateCassette from './validators/cassette';
import validateChainrings from './validators/chainring';

import reduce from 'lodash/reduce';
import each from 'lodash/each';

export default function gearSizes(
  chainRings, cassette, rimDiameter,
  tyreSize, measure = "inches"
){
  validateCassette(cassette);
  validateChainrings(chainRings);

  const rimAndTyreDiameter = wheelDiameter(rimDiameter, tyreSize);
  const result = reduce(chainRings, (acc, chainRing) => {
      each(cassette, (sprocket) => {
        const _gearSize = gearSize(chainRing, sprocket, rimAndTyreDiameter);
        acc.push(
          gearSizeObjectFactory(
            chainRing,
            sprocket,
            _gearSize,
            1,//ratio,
            rimAndTyreDiameter)
        );
      });
    return acc;
    }, []
  );
  return result;
}

const gearSizeObjectFactory = (
  chainRing, sprocket, gearSize, ratio, rimAndTyreDiameter) => {
  return {
    chainRing: chainRing,
    sprocket: sprocket,
    gearSize: gearSize,
    details: {
      ratio: ratio,
      rimAndTyreDiameterInInches: rimAndTyreDiameter
    },
    toString: function() {
      return this.chainRing + " x " + this.sprocket + ", ratio: " + this.details.ratio + ", diameter: " + this.details.rimAndTyreDiameterInInches;
    }
  };
};
