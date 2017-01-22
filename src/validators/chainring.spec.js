import validate from './chainring';

const config = {
  chainRingCombinations: [
    [39,53]
  ]
};

const Sut = (chainRings) => {
  validate(chainRings, config.chainRingCombinations);
};

describe('src/validator', function(){

  context('chainring validation', function(){
    context('with valid input', function(){
      it('should not throw', function(){
        const validChainRings = [39,53];
        const act = () => Sut(validChainRings);
        act.should.not.throw();
      });
    });
    context('with invalid input', function(){
      it('should throw when two rings are provided but size is incompatible', function(){
        const invalidInput = [39,51];
        const act = () => Sut(invalidInput);
        act.should.throw(`Chainring combination ${invalidInput} is not supported.`);
      });
      it('should throw when one ring is provided', function(){
        const invalidInput = [39];
        const act = () => Sut(invalidInput);
        act.should.throw(`Invalid number of chainrings.`);
      });
      it('should throw when input is not an array', function(){
        const invalidInput = "39,53";
        const act = () => Sut(invalidInput);
        act.should.throw(`Invalid number of chainrings.`);
      });
    });
  });
});
