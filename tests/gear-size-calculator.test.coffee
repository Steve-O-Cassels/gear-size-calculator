GearSize = require './../src/calculator'
Util = require('util')

exports.GearSizeCalculatorTest =

setUp: (callback) ->
  @sut = new GearSize.Calculator()
  callback()

'test can generate a single gear size in inches': (test) ->
  rimDiameter = 622
  tyreSize = 28
  rimAndTyreDiameterInInches = @sut.mmToInches 622 + 28 * 2
  chainRing = 39
  sprocket = 23
  gearRatio = @sut.getGearRatio chainRing, sprocket
  result = @sut.getGearSizeInInches gearRatio, rimAndTyreDiameterInInches
  expected = 45.4
  test.equal(result, expected)
  test.done()

'test can generate gear sizes for multiple chainrings and cassettes in inches': (test) ->
  chainRings = [39,53]
  cassette = [12,13,14,15,16,17,19,21,23,25]
  rimDiameter = 622
  tyreSize = 28
  result = @sut.generateGearSizesInInches chainRings, cassette, rimDiameter, tyreSize
  expected = [
              [
                {
                  chainRing: 39
                  sprocket: 12
                  gearSize: 86.7
                  details:
                    ratio: 3.25
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 13
                  gearSize: 80.1
                  details:
                    ratio: 3
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 14
                  gearSize: 74.5
                  details:
                    ratio: 2.79
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 15
                  gearSize: 69.4
                  details:
                    ratio: 2.6
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 16
                  gearSize: 65.1
                  details:
                    ratio: 2.44
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 17
                  gearSize: 61.1
                  details:
                    ratio: 2.29
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 19
                  gearSize: 54.7
                  details:
                    ratio: 2.05
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 21
                  gearSize: 49.6
                  details:
                    ratio: 1.86
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 23
                  gearSize: 45.4
                  details:
                    ratio: 1.7
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 39
                  sprocket: 25
                  gearSize: 41.6
                  details:
                    ratio: 1.56
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
              ]
              [
                {
                  chainRing: 53
                  sprocket: 12
                  gearSize: 118
                  details:
                    ratio: 4.42
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 13
                  gearSize: 108.9
                  details:
                    ratio: 4.08
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 14
                  gearSize: 101.2
                  details:
                    ratio: 3.79
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 15
                  gearSize: 94.2
                  details:
                    ratio: 3.53
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 16
                  gearSize: 88.3
                  details:
                    ratio: 3.31
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 17
                  gearSize: 83.3
                  details:
                    ratio: 3.12
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 19
                  gearSize: 74.5
                  details:
                    ratio: 2.79
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 21
                  gearSize: 67.3
                  details:
                    ratio: 2.52
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 23
                  gearSize: 61.4
                  details:
                    ratio: 2.3
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
                {
                  chainRing: 53
                  sprocket: 25
                  gearSize: 56.6
                  details:
                    ratio: 2.12
                    rimAndTyreDiameterInInches: 26.69
                  toString: [ Function ]
                }
              ]
]

  test.notDeepEqual(result, expected)
  test.done()

'test can get circumference': (test) ->
  wheelDiameter = 622
  result = @sut.getCircumference wheelDiameter
  test.equal(result, 1954.07)
  test.done()

'test can get circumference of rim and tyre combined': (test) ->
  wheelDiameter = 622
  tyreSize = 28
  result = @sut.getRimAndTyreCircumference wheelDiameter, tyreSize
  test.equal(result, 2130.00)
  test.done()

'test can get gear ratio': (test) ->
  chainRing = 39
  sprocket = 23
  result = @sut.getGearRatio chainRing, sprocket
  test.equal(result, 1.70)
  test.done()

'test can convert mm to cm': (test) ->
  mm = 10
  result = @sut.mmToCm mm
  test.equal(result, 1.0)
  test.done()

'test can convert mm to inches': (test) ->
  mm = 25.4
  result = @sut.mmToInches mm
  test.equal(result, 1.0)
  test.done()
