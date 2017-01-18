import validate from './cassette';

describe('src/validators/cassette', function(){
  let sut = validate;

  context('cassette validation', function(){
    context('with valid cassette', function(){
      it('should not throw', function(){
        const act = () => sut([12,13,14,15,16,17,19,21,23,25]);
        act.should.not.throw();
      });
    });
    context('with invalid cassette', function(){
      it('should throw when sprocket combination is not supported.', function(){
        const invalidInput = [1,2,3,4,5,6,7,8,9,0];
        const act = () => sut(invalidInput);
        act.should.throw(`Cassette combination ${invalidInput} is not supported.`);
      });
      it('should throw when cassette is not an array', function(){
        const invalidInput = '[1,2,3,4,5,6,7,8,9,0]';
        const act = () => sut(invalidInput);
        act.should.throw(`Cassette combination ${invalidInput} is not supported.`);
      });
    });
    // context('with invalid cassette size', function(){
    //   it('should throw when the cassette has an unsupported sprocket count', function(){
    //     const invalidInput = [12,13,14];
    //     const act = () => sut(invalidInput);
    //     act.should.throw(`Number of sprockets in the cassette was ${invalid.length} but must be one of: ${cassetteSpeeds}.`);
    //   });
    //   // it('should throw when the cassette has more than 11 sprockets', function(){
    //   //   const invalidInput = [12,13,14,15,16,17,18,19,21,22,23,25];
    //   //   const act = () => sut(invalidInput);
    //   //   act.should.throw(`Cassette combination ${invalidInput} is not supported.`);
    //   // });
    // });
  });
});
