import union from 'lodash/union';

const cassetteSprocketCount = [
  8,9,10,11
];

const eightCassettes = [
  [12,13,14,15,16,17,19,21]
];

const nineCassettes = [
  [12,13,14,15,16,17,19,21,23]
];

const tenCassettes = [
  [11,12,13,14,15,16,17,19,21,23],
  [12,13,14,15,16,17,19,21,23,25],
  [13,14,15,16,17,19,21,23,25,27]
];
const elevenCassettes = [
  [11,12,13,14,15,16,17,18,19,21,23],
  [12,13,14,15,16,17,18,19,21,23,25],
  [13,14,15,16,17,18,19,21,23,25,27]
];
const iNeedToTrainMoreChainrings = [
  34,50
];
const severelyRollingParcourChainrings = [
  36,52
];
const racingChainrings = [
  39,53
];
const tyreWidths = [
  23,25,28,32,35,37
];
const rimDiameters = [
  622, // 700
  630, // 27"
  635 // 28"
];

module.exports = {
  chainRingCombinations: [
    iNeedToTrainMoreChainrings,
    severelyRollingParcourChainrings,
    racingChainrings
  ],
  chainRings: union(
    iNeedToTrainMoreChainrings,
    severelyRollingParcourChainrings,
    racingChainrings
  ),
  cassetteSpeeds: [
    cassetteSprocketCount
  ],
  cassetteCombinations: [
    eightCassettes,
    nineCassettes,
    tenCassettes,
    elevenCassettes
  ],
  sprockets: union(
    eightCassettes,
    nineCassettes,
    tenCassettes,
    elevenCassettes
  ),
  rimDiameters,
  tyreWidths
};
