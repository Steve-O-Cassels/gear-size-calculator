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

  const setupStubs = () => {
    cassetteValidatorMock = sinon.stub().returns(true);
    chainringValidatorMock = sinon.stub().returns(true);
    wheelDiameterMock = { wheelDiameter: sinon.stub().returns(672) };
    gearSizeMock = sinon.stub().returns(1);
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
