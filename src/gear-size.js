import round from 'lodash/round';

export default function gearSize(chainRing, sprocket, rimAndTyreDiameterInMm){
  const gearRatio = chainRingSprocketRatio(chainRing, sprocket);
  const gearSize = gearRatio * rimAndTyreDiameterInMm;
  return round(gearSize, 1);
}

const chainRingSprocketRatio = (chainring, sprocket) => {
  const ratio = chainring/sprocket;
  return round(ratio, 2);
};
