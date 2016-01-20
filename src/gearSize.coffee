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
    toString: -> return @chainRing + " x " + @sprocket + " : " + @gearSize
  }


generateGearSizeInMetres = (chainRing, cassette, rimAndTyreCircumference) ->
  rimAndTyreCircumferenceInCm = mmToCm rimAndTyreCircumference
  for sprocket in cassette
    do(sprocket) ->
      ratio = getGearRatio chainRing, sprocket
      gearSize = getGearSizeInMetres ratio, rimAndTyreCircumferenceInCm

getGearRatio = (chainring = 39, sprocket = 25) ->
  ratio = chainring/sprocket
  Math.round10 ratio, -2

getGearSizeInInches = (gearRatio, rimAndTyreDiameterInInches) ->
  gearSize = gearRatio * rimAndTyreDiameterInInches
  Math.round10 gearSize, -1

getGearSizeInMetres = (gearRatio, rimAndTyreCircumferenceInCm) ->
  gearSize = gearRatio * rimAndTyreCircumferenceInCm
  Math.round10 gearSize, -1

getRimAndTyreCircumference = (rimDiameter = 622, tyreSize = 25) ->
  getCircumference getRimAndTyreDiameter rimDiameter, tyreSize

getRimAndTyreDiameter = (rimDiameter = 622, tyreSize = 25) ->
  rimDiameter + (tyreSize * 2)

getCircumference = (diameter = 672) ->
  circumference = diameter * pi
  Math.round10 circumference, -2

mmToInches = (mm) ->
  cm = mmToCm mm
  inches = cm / 2.54
  Math.round10 inches, -2

mmToCm = (mm) ->
  Math.round10 (mm / 10), -2


# Closure
do ->
  # Decimal round

  ###*
  # Decimal adjustment of a number.
  #
  # @param {String}  type  The type of adjustment.
  # @param {Number}  value The number.
  # @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
  # @returns {Number} The adjusted value.
  ###

  decimalAdjust = (type, value, exp) ->
    # If the exp is undefined or zero...
    if typeof exp == 'undefined' or +exp == 0
      return Math[type](value)
    value = +value
    exp = +exp
    # If the value is not a number or the exp is not an integer...
    if isNaN(value) or !(typeof exp == 'number' and exp % 1 == 0)
      return NaN
    # Shift
    value = value.toString().split('e')
    value = Math[type](+(value[0] + 'e' + (if value[1] then +value[1] - exp else -exp)))
    # Shift back
    value = value.toString().split('e')
    +(value[0] + 'e' + (if value[1] then +value[1] + exp else exp))

  if !Math.round10

    Math.round10 = (value, exp) ->
      decimalAdjust 'round', value, exp

  # Decimal floor
  if !Math.floor10

    Math.floor10 = (value, exp) ->
      decimalAdjust 'floor', value, exp

  # Decimal ceil
  if !Math.ceil10

    Math.ceil10 = (value, exp) ->
      decimalAdjust 'ceil', value, exp

  return

# ---


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
