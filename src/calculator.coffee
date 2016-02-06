_ = require 'lodash/math'
pi = Math.PI

generateGearSizes = (chainRings, cassette, rimDiameter, tyreSize, measure = "inches") ->
  if measure == "inches"
    generateGearSizesInInches chainRings, cassette, rimDiameter, tyreSize
  else
    generateGearSizesInMetres chainRings, cassette, rimDiameter, tyreSize

generateGearSizesInInches = (chainRings, cassette, rimDiameter, tyreSize) ->
  rimAndTyreDiameter = getRimAndTyreDiameter rimDiameter, tyreSize
  for chainRing in chainRings
    do(chainRing) ->
      generateGearSizeInInches chainRing, cassette, rimAndTyreDiameter

generateGearSizesInMetres = (chainRings, cassette, rimDiameter, tyreSize) ->
  rimAndTyreCircumference = getRimAndTyreCircumference rimDiameter, tyreSize
  for chainRing in chainRings
    do(chainRing) ->
      generateGearSizeInMetres chainRing, cassette, rimAndTyreCircumference

generateGearSizeInInches = (chainRing, cassette, rimAndTyreDiameter) ->
  rimAndTyreDiameterInInches = mmToInches rimAndTyreDiameter
  for sprocket in cassette
    do(sprocket) ->
      ratio = getGearRatio chainRing, sprocket
      gearSize = getGearSizeInInches ratio, rimAndTyreDiameterInInches
      createGearSizeObject chainRing, sprocket, gearSize, ratio, rimAndTyreDiameterInInches

createGearSizeObject = (chainRing, sprocket, gearSize, ratio, rimAndTyreDiameterInInches) ->
  {
    chainRing
    sprocket
    gearSize
    details: {
      ratio
      rimAndTyreDiameterInInches
    }
    toString: -> return @chainRing + " x " + @sprocket + ", ratio: " + @details.ratio + ", diameter: " + @details.rimAndTyreDiameterInInches
  }


generateGearSizeInMetres = (chainRing, cassette, rimAndTyreCircumference) ->
  rimAndTyreCircumferenceInCm = mmToCm rimAndTyreCircumference
  for sprocket in cassette
    do(sprocket) ->
      ratio = getGearRatio chainRing, sprocket
      gearSize = getGearSizeInMetres ratio, rimAndTyreCircumferenceInCm

getGearRatio = (chainring = 39, sprocket = 25) ->
  ratio = chainring/sprocket
  _.round ratio, 2

getGearSizeInInches = (gearRatio, rimAndTyreDiameterInInches) ->
  gearSize = gearRatio * rimAndTyreDiameterInInches
  _.round gearSize, 1

getGearSizeInMetres = (gearRatio, rimAndTyreCircumferenceInCm) ->
  gearSize = gearRatio * rimAndTyreCircumferenceInCm
  _.round gearSize, 1

getRimAndTyreCircumference = (rimDiameter = 622, tyreSize = 25) ->
  getCircumference getRimAndTyreDiameter rimDiameter, tyreSize

getRimAndTyreDiameter = (rimDiameter = 622, tyreSize = 25) ->
  rimDiameter + (tyreSize * 2)

getCircumference = (diameter = 672) ->
  circumference = diameter * pi
  _.round circumference, 2

mmToInches = (mm) ->
  cm = mmToCm mm
  inches = cm / 2.54
  _.round inches, 2

mmToCm = (mm) ->
  _.round (mm / 10), 2

# create a namespace to export our public methods
GearSize = exports? and exports or @GearSize = {}

class GearSize.Calculator
  generateGearSizes: generateGearSizes
  generateGearSizesInInches: generateGearSizesInInches
  getGearSizeInInches: getGearSizeInInches
  getGearRatio: getGearRatio
  getCircumference: getCircumference
  getRimAndTyreCircumference: getRimAndTyreCircumference
  getRimAndTyreDiameter: getRimAndTyreDiameter
  mmToInches: mmToInches
  mmToCm: mmToCm
