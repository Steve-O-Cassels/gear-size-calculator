import gearSize from './gear-size';

describe('src/gear-size/', function(){
  let sut = gearSize;
  let chainRing = 39, sprocket = 25;
  let rimAndTyreDiameterInMm = 672;

  describe('gearSize', function(){
    context('when provided with valid chainring, sprocket, rimAndTyreDiameterInMm', function(){
      it('should calculate the correct gear size', function(){
        sut(chainRing, sprocket, rimAndTyreDiameterInMm)
        .should.equal(1048.3);
      });
    });
  });
});
