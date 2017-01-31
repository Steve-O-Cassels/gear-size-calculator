import round from 'lodash/round';

export default function gearSize(chainRing, sprocket, rimAndTyreDiameterInMm){
  const gearRatio = chainRingSprocketRatio(chainRing, sprocket);
  const gearSize = gearRatio * rimAndTyreDiameterInMm;
  return {
    gearSize: round(gearSize, 1),
    gearRatio: gearRatio
  };
}

const chainRingSprocketRatio = (chainring, sprocket) => {
  const ratio = chainring/sprocket;
  return round(ratio, 2);
};
