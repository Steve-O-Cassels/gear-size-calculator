import {mmToInches} from './convert-unit';

describe('src/utils/convert-unit/mmToInches', function() {
  const sut = mmToInches;
  context('when passed one inch in mm', function() {
    it('should return one inch', function() {
      const act = () => sut(25.4);
      act().should.equal(1);
    });
  });
});
