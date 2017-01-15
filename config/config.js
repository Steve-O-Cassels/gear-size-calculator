import union from 'lodash/union';

const campagTenCassettes = [
  [11,12,13,14,15,16,17,19,21,23],
  [12,13,14,15,16,17,19,21,23,25],
  [13,14,15,16,17,19,21,23,25,27]
];
const campagElevenCassettes = [
  [11,12,13,14,15,16,17,18,19,21,23],
  [12,13,14,15,16,17,18,19,21,23,25],
  [13,14,15,16,17,18,19,21,23,25,27]
];
const campagINeedToTrainMoreChainrings = [
  34,50
];
const campagSeverelyRollingParcourChainrings = [
  36,52
];
const campagRacingChainrings = [
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
    campagINeedToTrainMoreChainrings,
    campagSeverelyRollingParcourChainrings,
    campagRacingChainrings
  ],
  chainRings: union(
    campagINeedToTrainMoreChainrings,
    campagSeverelyRollingParcourChainrings,
    campagRacingChainrings
  ),
  cassetteCombinations: [
    campagTenCassettes,
    campagElevenCassettes
  ],
  sprockets: union(
    campagTenCassettes,
    campagElevenCassettes
  ),
  rimDiameters,
  tyreWidths
};
