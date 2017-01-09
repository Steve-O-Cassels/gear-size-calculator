import wheelCircumference, {wheelDiameter} from './wheel-dimensions';

describe('./src/wheel-dimensions/wheelCircumference', function(){
  const sut = wheelCircumference;
  context('when passed 622 rimDiameter and 25 tyre', function(){
    it('should return circumference of the wheel with the tyre fitted', function(){
      const act = () => sut(622, 25);
      act().should.equal(2111.15);
    });
  });
});

describe('./src/wheel-dimensions/wheelDiameter', function(){
  const sut = wheelDiameter;
  context('when passed 622 rimDiameter and 25 tyre', function(){
    it('should return diameter of the wheel with the tyre fitted', function(){
      sut(622, 25).should.equal(672);
    });
  });
});
