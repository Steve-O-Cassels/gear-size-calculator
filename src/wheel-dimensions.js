import round from 'lodash/round';
const PI = Math.PI;

export default function wheelCircumference(rimDiameter,tyreSize){
  const rimAndTyreDiameter = wheelDiameter(rimDiameter, tyreSize);
  return circumference(rimAndTyreDiameter);
}

export function wheelDiameter(rimDiameter = 622, tyreSize = 25){
  return rimDiameter + (tyreSize * 2);
}

const circumference = (diameter) => {
  const _circumference = diameter * PI;
  return round(_circumference, 2);
};
