import gearSize from './gear-size';

describe('src/gear-size/', function(){
  let sut = gearSize;

  describe('gearSize', function(){
    context('when provided with valid input', function(){
      let chainRing = 39, sprocket = 25;
      let rimAndTyreDiameterInMm = 672;

      it('should calculate the correct gear size', function(){
        const result = sut(chainRing, sprocket, rimAndTyreDiameterInMm);
        result['gearSize'].should.equal(1048.3);
      });
      it('should calculate the correct gear ratio', function(){
        const result = sut(chainRing, sprocket, rimAndTyreDiameterInMm);
        result['gearRatio'].should.equal(1.56);
      });      
    });
  });
});
