var GearSize, createGearSizeObject, generateGearSizeInInches, generateGearSizeInMetres, generateGearSizes, generateGearSizesInInches, generateGearSizesInMetres, getCircumference, getGearRatio, getGearSizeInInches, getGearSizeInMetres, getRimAndTyreCircumference, getRimAndTyreDiameter, mmToCm, mmToInches, pi;

pi = Math.PI;

generateGearSizes = function(chainRings, cassette, rimDiameter, tyreSize, measure) {
  if (measure == null) {
    measure = "inches";
  }
  if (measure === "inches") {
    return generateGearSizesInInches(chainRings, cassette, rimDiameter, tyreSize);
  } else {
    return generateGearSizesInMetres(chainRings, cassette, rimDiameter, tyreSize);
  }
};

generateGearSizesInInches = function(chainRings, cassette, rimDiameter, tyreSize) {
  var chainRing, i, len, results, rimAndTyreDiameter;
  rimAndTyreDiameter = getRimAndTyreDiameter(rimDiameter, tyreSize);
  results = [];
  for (i = 0, len = chainRings.length; i < len; i++) {
    chainRing = chainRings[i];
    results.push((function(chainRing) {
      return generateGearSizeInInches(chainRing, cassette, rimAndTyreDiameter);
    })(chainRing));
  }
  return results;
};

generateGearSizesInMetres = function(chainRings, cassette, rimDiameter, tyreSize) {
  var chainRing, i, len, results, rimAndTyreCircumference;
  rimAndTyreCircumference = getRimAndTyreCircumference(rimDiameter, tyreSize);
  results = [];
  for (i = 0, len = chainRings.length; i < len; i++) {
    chainRing = chainRings[i];
    results.push((function(chainRing) {
      return generateGearSizeInMetres(chainRing, cassette, rimAndTyreCircumference);
    })(chainRing));
  }
  return results;
};

generateGearSizeInInches = function(chainRing, cassette, rimAndTyreDiameter) {
  var i, len, results, rimAndTyreDiameterInInches, sprocket;
  rimAndTyreDiameterInInches = mmToInches(rimAndTyreDiameter);
  results = [];
  for (i = 0, len = cassette.length; i < len; i++) {
    sprocket = cassette[i];
    results.push((function(sprocket) {
      var gearSize, ratio;
      ratio = getGearRatio(chainRing, sprocket);
      gearSize = getGearSizeInInches(ratio, rimAndTyreDiameterInInches);
      return createGearSizeObject(chainRing, sprocket, gearSize, ratio, rimAndTyreDiameterInInches);
    })(sprocket));
  }
  return results;
};

createGearSizeObject = function(chainRing, sprocket, gearSize, ratio, rimAndTyreDiameterInInches) {
  return {
    chainRing: chainRing,
    sprocket: sprocket,
    gearSize: gearSize,
    details: {
      ratio: ratio,
      rimAndTyreDiameterInInches: rimAndTyreDiameterInInches
    },
    toString: function() {
      return this.chainRing + " x " + this.sprocket + ", ratio: " + this.details.ratio + ", diameter: " + this.details.rimAndTyreDiameterInInches;
    }
  };
};

generateGearSizeInMetres = function(chainRing, cassette, rimAndTyreCircumference) {
  var i, len, results, rimAndTyreCircumferenceInCm, sprocket;
  rimAndTyreCircumferenceInCm = mmToCm(rimAndTyreCircumference);
  results = [];
  for (i = 0, len = cassette.length; i < len; i++) {
    sprocket = cassette[i];
    results.push((function(sprocket) {
      var gearSize, ratio;
      ratio = getGearRatio(chainRing, sprocket);
      return gearSize = getGearSizeInMetres(ratio, rimAndTyreCircumferenceInCm);
    })(sprocket));
  }
  return results;
};

getGearRatio = function(chainring, sprocket) {
  var ratio;
  if (chainring == null) {
    chainring = 39;
  }
  if (sprocket == null) {
    sprocket = 25;
  }
  ratio = chainring / sprocket;
  return Math.round10(ratio, -2);
};

getGearSizeInInches = function(gearRatio, rimAndTyreDiameterInInches) {
  var gearSize;
  gearSize = gearRatio * rimAndTyreDiameterInInches;
  return Math.round10(gearSize, -1);
};

getGearSizeInMetres = function(gearRatio, rimAndTyreCircumferenceInCm) {
  var gearSize;
  gearSize = gearRatio * rimAndTyreCircumferenceInCm;
  return Math.round10(gearSize, -1);
};

getRimAndTyreCircumference = function(rimDiameter, tyreSize) {
  if (rimDiameter == null) {
    rimDiameter = 622;
  }
  if (tyreSize == null) {
    tyreSize = 25;
  }
  return getCircumference(getRimAndTyreDiameter(rimDiameter, tyreSize));
};

getRimAndTyreDiameter = function(rimDiameter, tyreSize) {
  if (rimDiameter == null) {
    rimDiameter = 622;
  }
  if (tyreSize == null) {
    tyreSize = 25;
  }
  return rimDiameter + (tyreSize * 2);
};

getCircumference = function(diameter) {
  var circumference;
  if (diameter == null) {
    diameter = 672;
  }
  circumference = diameter * pi;
  return Math.round10(circumference, -2);
};

mmToInches = function(mm) {
  var cm, inches;
  cm = mmToCm(mm);
  inches = cm / 2.54;
  return Math.round10(inches, -2);
};

mmToCm = function(mm) {
  return Math.round10(mm / 10, -2);
};

(function() {

  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  var decimalAdjust;
  decimalAdjust = function(type, value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  };
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();

GearSize = (typeof exports !== "undefined" && exports !== null) && exports || (this.GearSize = {});

GearSize.Calculator = (function() {
  function Calculator() {}

  Calculator.prototype.generateGearSizes = generateGearSizes;

  Calculator.prototype.generateGearSizesInInches = generateGearSizesInInches;

  Calculator.prototype.getGearSizeInInches = getGearSizeInInches;

  Calculator.prototype.getGearRatio = getGearRatio;

  Calculator.prototype.getCircumference = getCircumference;

  Calculator.prototype.getRimAndTyreCircumference = getRimAndTyreCircumference;

  Calculator.prototype.getRimAndTyreDiameter = getRimAndTyreDiameter;

  Calculator.prototype.mmToInches = mmToInches;

  Calculator.prototype.mmToCm = mmToCm;

  return Calculator;

})();
