import mmToInches, {mmToCm} from './convert-unit';

describe('src/utils/convert-unit/mmToInches', function() {
  const sut = mmToInches;
  context('when passed one inch in mm', function() {
    it('should return one inch with no decimal place', function() {
      const act = () => sut(25.4);
      act().should.equal(1);
    });
  });
  context('when passed invalid input', function() {
    it('should throw invalid input error', function() {
      const act = () => sut('bob');
      act.should.throw('mm must be an number');
    });
  });
  context('when passed partial mm', function(){
    it('should return inches accurate to two decimal places', function(){
      const act = () => sut(10.75);
      act().should.equal(0.43);
    });
  });
});
describe('src/utils/convert-unit/mmToCm', function(){
  const sut = mmToCm;
  context('when passed 10mm', function(){
    it('should return one cm with no decimal places', function(){
      const act = () => sut(10);
      act().should.equal(1);
    });
  });
  context('when passed partial mm', function(){
    it('should return cm accurate to two decimal places', function(){
      const act = () => sut(10.75);
      act().should.equal(1.08);
    });
  });
  context('when passed invalid input', function(){
    it('should throw invalid input error', function(){
      const act = () => sut('bob');
      act.should.throw('mm must be an number');
    });
  });
});
