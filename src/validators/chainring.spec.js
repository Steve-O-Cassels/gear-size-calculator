import validate from './chainring';

describe('src/validator', function(){
  let sut = validate;

  context('chainring validation', function(){
    context('with valid input', function(){
      it('should not throw', function(){
        const act = () => sut([39,53]);
        act.should.not.throw();
      });
    });
    context('with invalid input', function(){
      it('should throw when two rings are provided but size is incompatible', function(){
        const invalidInput = [39,51];
        const act = () => sut(invalidInput);
        act.should.throw(`Chainring combination ${invalidInput} is not supported.`);
      });
      it('should throw when one ring is provided', function(){
        const invalidInput = [39];
        const act = () => sut({chainRings: invalidInput});
        act.should.throw(`Chainring combination must be an array of two chainrings.`);
      });
      it('should throw when input is not an array', function(){
        const invalidInput = "39,53";
        const act = () => sut({chainRings: invalidInput});
        act.should.throw(`Chainring combination must be an array of two chainrings.`);
      });
    });
  });
});
