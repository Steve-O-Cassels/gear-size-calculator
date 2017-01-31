let Sut;
let moduleUnderTest = './gear-size-calculator';


describe('src/gear-size/', function(){
  let cassetteValidatorMock,
    chainringValidatorMock,
    gearSizeMock,
    wheelDiameterMock;

  before(function(){
    mockery.enable({ useCleanCache: true });
    mockery.registerAllowable(moduleUnderTest);
    mockery.warnOnUnregistered(false);
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function(){
    setupStubs();
    registerMocks();
    Sut = require(moduleUnderTest).default;
  });

  afterEach(function(){
    mockery.deregisterAll();
    mockery.resetCache();
  });

  let mockValues = {
    cassetteIsValid: true,
    chainRingIsValid: true,
    wheelDiameter: 672,
    gearSize: 108,
    gearRatio: 1.6
  };

  const setupStubs = () => {
    cassetteValidatorMock = sinon.stub().returns(mockValues.cassetteIsValid);
    chainringValidatorMock = sinon.stub().returns(mockValues.chainRingIsValid);
    wheelDiameterMock = { wheelDiameter: sinon.stub().returns(mockValues.wheelDiameter) };
    gearSizeMock = sinon.stub().returns({
      gearSize: mockValues.gearSize,
      gearRatio: mockValues.gearRatio
    });
  };

  const registerMocks = () => {
    mockery.registerMock('./gear-size', gearSizeMock);
    mockery.registerMock('./wheel-dimensions', wheelDiameterMock);
    mockery.registerMock('./validators/cassette', cassetteValidatorMock);
    mockery.registerMock('./validators/chainring', chainringValidatorMock);
  };

  describe('gearSize', function(){
    context('with valid input', function(){
      let chainRings = [39,53],
       cassette = [12,13,14,15,16,17,18,19,21,23,25],
       rimDiameter = 622,
       tyreSize = 25;

      const act = () => {
        return Sut(chainRings, cassette, rimDiameter, tyreSize);
      };
      it('should return an array of object', function(){
        act()[0].should.be.an('object');
      });
      it('should return correct gear size', function(){
        const expected = {
          chainRing: chainRings[0],
          sprocket: cassette[0],
          gearSize: mockValues.gearSize,
          gearRatio: mockValues.gearRatio,
          rimAndTyreDiameter: mockValues.wheelDiameter
        };
        const firstOfResult = act()[0];

        firstOfResult.should.have.property('chainRing', expected.chainRing);
        firstOfResult.should.have.property('sprocket', expected.sprocket);
        firstOfResult.should.have.property('gearSize', expected.gearSize);
        firstOfResult.should.have.property('gearRatio', expected.gearRatio);
        firstOfResult.should.have.property('rimAndTyreDiameter', expected.rimAndTyreDiameter);
      });

      it('should return correct number of gear sizes', function(){
        act().length.should.equal(cassette.length * chainRings.length);
      });
      it('should call cassette validator with correct args', function(){
        act();
        cassetteValidatorMock.should
        .have.been.calledWith(cassette);
      });
      it('should call chainrings validator with correct args', function(){
        act();
        chainringValidatorMock.should
        .have.been.calledWith(chainRings);
      });
      it('should call wheelDiameter once', function(){
        act();
        wheelDiameterMock.wheelDiameter.should
        .have.been.calledOnce;
      });
      it('should call gearSize once per chainring and sprocket combination', function(){
        act();
        gearSizeMock.callCount
        .should.equal(chainRings.length * cassette.length);
      });
    });
  });
});
