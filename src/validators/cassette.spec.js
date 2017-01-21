import validate from './cassette';

const config = {
  cassetteCombinations: [
    [12,13,14,15,16,17,19,21,23,25]
  ],
  cassetteSpeeds: [
    10
  ]
};

describe('src/validators/cassette', function(){

  let Sut = (cassette) => validate(
    cassette,
    config.cassetteCombinations,
    config.cassetteSpeeds
  );

  context('cassette validation for 10 speed', function(){
    context('with valid  cassette', function(){
      it('should not throw', function(){
        const validCassette = [12,13,14,15,16,17,19,21,23,25];
        const act = () => Sut(validCassette);
        act.should.not.throw();
      });
    });
    context('with invalid cassette', function(){
      it('should throw when sprocket combination is not supported.', function(){
        const invalidInput = [1,2,3,4,5,6,7,8,9,0];
        const act = () => Sut(invalidInput);
        act.should.throw(`Cassette combination ${invalidInput} is not supported.`);
      });
      it('should throw when cassette does not match an array of numbers', function(){
        const invalidInput = "[1,2,9,0]";
        const act = () => Sut(invalidInput);
        act.should.throw(/Invalid number of sprockets in the cassette/);
      });
    });
    context('with invalid cassette size', function(){
      it('should throw when the cassette has an unsupported sprocket count', function(){
        const invalidInput = [12,13,14];
        const act = () => Sut(invalidInput);
        act.should.throw(/Invalid number of sprockets in the cassette/);
      });
      it('should throw when the cassette has more than 10 sprockets', function(){
        const invalidInput = [12,13,14,15,16,17,18,19,21,22,23];
        const act = () => Sut(invalidInput);
        act.should.throw(/Invalid number of sprockets in the cassette/);
      });
    });
  });
});
