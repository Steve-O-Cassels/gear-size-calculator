import round from 'lodash/round';

export default function wheelCircumference(rimDiameter,tyreSize){
  const rimAndTyreDiameter = wheelDiameter(rimDiameter, tyreSize);
  return circumference(rimAndTyreDiameter);
}

export function wheelDiameter(rimDiameter, tyreSize){
  return rimDiameter + (tyreSize * 2);
}

const circumference = (diameter) => {
  const _circumference = diameter * Math.PI;
  return round(_circumference, 2);
};
