import validator from './validator';

describe('src/validator', function(){
  let sut = validator;

  context('when provided with a valid chainring combination', function(){
    it('should not throw', function(){
      const act = () => sut([39,53]);
      act.should.not.throw();
    });
  });
  context('when provided with an invalid chainring combination', function(){
    it('should throw', function(){
      const invalidInput = [39,51];
      const act = () => sut(invalidInput);
      act.should.throw(`Chainring combination ${invalidInput} is not supported.`);
    });
  });
});
