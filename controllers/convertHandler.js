function ConvertHandler() {
  
  this.getNum = function(input) {
    let result, operands;
    let numbers, slashes;

    //let result = input.match(/^\d+[.]*\d*[/]*\d*[.]*\d*/)[0];
    numbers = input.match(/\d+[./0-9]*/g);
    slashes = input.match(/[/]/g);

    //console.log(numbers, slashes);

    // If more than one string of numbers is matched, the input is invalid
    if (numbers != null && numbers.length > 1) {
      return null;
    }

    // If the slashes array is not 0 or 1, the input is invalid
    if (slashes != null && slashes.length > 1) {
      return null;
    }

    // If one slash is matched in the input, calculate the quotient of the two numbers
    if (slashes != null && slashes.length == 1) {
      if (numbers == null) return null;

      operands = numbers[0].split("/");
      result = operands[0] / operands[1];
    } 

    // If there are no divison symbols in the input, set the result to the first and only value of the numbers array
    if (slashes == null && numbers != null) result = numbers[0];

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
      'lbs': 'kg',
      'km': 'mi',
      'L': 'gal',
      'kg': 'lbs'
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
      'lbs': 'pounds',
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

    // Calculate the results of the unit converstion
    let result = initNum * convFactor;

    // Account for floating-point errors
    result = Number(result.toFixed(5));
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
