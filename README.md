# gear-size-calculator
Create gear size data for bike ratio comparison.

## Install
* `$ npm install gear-size-calculator --save`

## Test
* `$ npm test`

## Features
Create gear-size data in inches for each chainring-sprocket combination comprising these inputs:
* chainRings - an array of chainrings
* cassette - an array of sprocket sizes
* rimDiameter - the diameter of a bare wheel in mm without the tyre
* tyreSize - the depth of a tyre in mm

### Example
```
# vars and require
var calculator, cassette, chainRings, gearsize, result, rimDiameter, tyreSize;
gearsize = require('gear-size-calculator');
calculator = new gearsize.Calculator();

# fill out some params
chainRings = [34,36,39,42,50,52,53];
cassette = [11,12,13,14,15,16,17,19,21,22,23,24,25,28];
rimDiameter = 622;
tyreSize = 28;

# generate some gear size data
result = calculator.generateGearSizesInInches(chainRings, cassette, rimDiameter, tyreSize);

console.log(result);

```
This is exemplified in the following test:
```
'test can generate gear sizes for multiple chainrings and cassettes in inches': (test) ->
  chainRings = [39,53]
  cassette = [12,13,14,15,16,17,19,21,23,25]
  rimDiameter = 622
  tyreSize = 28
  result = @sut.generateGearSizesInInches chainRings, cassette, rimDiameter, tyreSize
```
