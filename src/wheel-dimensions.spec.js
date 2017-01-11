import wheelCircumference, {wheelDiameter} from './wheel-dimensions';

describe('./src/wheel-dimensions/wheelCircumference', function(){
  const sut = wheelCircumference;
  context('when passed valid rimDiameter and tyre size', function(){
    it('should return correct circumference of the wheel with the tyre fitted', function(){
      let DiameterOf700cWheelInMm = 622;
      let tyreSizeInMm = 25;
      const act = () => sut(DiameterOf700cWheelInMm, tyreSizeInMm);
      act().should.equal(2111.15);
    });
  });
});

describe('./src/wheel-dimensions/wheelDiameter', function(){
  const sut = wheelDiameter;
  context('when passed valid rimDiameter and tyre size', function(){
    it('should return correct diameter of the wheel with the tyre fitted', function(){
      let DiameterOf700cWheelInMm = 622;
      let tyreSizeInMm = 25;
      sut(DiameterOf700cWheelInMm, tyreSizeInMm).should.equal(672);
    });
  });
});
