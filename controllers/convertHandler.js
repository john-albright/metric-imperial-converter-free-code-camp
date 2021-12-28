function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/^\d+[.]*\d*[/]*\d*[.]*\d*/)[0];
    let operands;

    if (result.match(/[/]/g)) {
      operands = result.split("/");
      result = operands[0] / operands[1];
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-z]+/i)[0];
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let unitConvMap = {
      'mi': 'km', 
      'gal': 'L',
      'lbs': 'kg'
    };

    let result = unitConvMap[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let unitSymbolToName = {
      'km': 'kilometers', 
      'L': 'liters',
      'kg': 'kilograms',
      'mi': 'miles',
      'kg': 'kilograms',
      'gal': 'gallons'
    };
    
    let result = unitSymbolToName[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    //console.log(initNum, initUnit);

    let convFactors = {
      'mi': miToKm, 
      'gal': galToL,
      'lbs': lbsToKg,
      'km': 1/miToKm,
      'L': 1/galToL,
      'kg': 1/lbsToKg
    };

    let convFactor = convFactors[initUnit];

    let result = initNum * convFactor;

    // Account for floating-point errors
    result = Math.round(result * 1000000000000) / 1000000000000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
