function ConvertHandler() {
  
  // Extract the number (correctly formatted) from the input
  this.getNum = function(input) {
    let result = null;
    let operands, decimalMatches, operand1Matches, operand2Matches;
    let digitsDecimalsSlashes, slashes;

    //let result = input.match(/^\d+[.]*\d*[/]*\d*[.]*\d*/)[0];
    digitsDecimalsSlashes = input.match(/^\d*[./0-9]*(?![^a-zA-Z]+)/g);
    numbers = input.match(/\d+/g);
    miscInput = input.match(/[^0-9a-z]/ig);
    slashes = input.match(/[/]/g);

    //console.log(miscInput, digitsDecimalsSlashes, numbers, slashes);

    // If more than one string of numbers is matched, the input is invalid
    if (digitsDecimalsSlashes != null && digitsDecimalsSlashes.length > 1) {
      return null;
    }

    // If the slashes array is not 0 or 1, the input is invalid
    if (slashes != null && slashes.length > 1) {
      return null;
    }

    // If one slash is matched in the input, calculate the quotient of the two numbers
    if (slashes != null && slashes.length == 1) {
      if (digitsDecimalsSlashes == null) return null;
      if (digitsDecimalsSlashes[0] != "/") {
        operands = digitsDecimalsSlashes[0].split("/");
        
        // Divide the two numbers if they only contain 0-1 decimals 
        operand1Matches = operands[0].match(/[.]/g);
        operand2Matches = operands[1].match(/[.]/g);
        if ((operand1Matches == null || operand1Matches.length <= 1) && (operand2Matches == null || operand2Matches.length <= 1)) {
          result = operands[0] / operands[1];
        }
      }
    } 

    // If there are no divison symbols in the input, set the result to the first and only value of the numbers array
    if (slashes == null && digitsDecimalsSlashes != null) {
      decimalMatches = digitsDecimalsSlashes[0].match(/[.]/g)
      if (digitsDecimalsSlashes[0].match(/\d+/g) && (decimalMatches == null || decimalMatches.length <= 1)) {
        result = new Number(digitsDecimalsSlashes[0]);
      }
      else result = null;
    }

    if (numbers == null && miscInput == null /* (digitsDecimalsSlashes == null || digitsDecimalsSlashes[0] == '')*/ ) result = 1;

    // Set the output to null if result is somehow set to NaN
    if (isNaN(result)) result = null;

    //console.log(`number extracted: ${result}`);
    return result;
  };

  // Extract the unit from the input
  this.getUnit = function(input) {
    let letters = input.match(/[a-z]+$/gi);
    let result = null;

    if (letters != null) result = letters[0];

    //console.log(`unit extracted: ${result}`);
    return result;
  };
  
  // Determine the unit symbol to be converted to 
  this.getReturnUnit = function(initUnit) {
    let result;

    // Dictionary to find the imperial/metric conversion of the input unit
    let unitConvMap = {
      'mi': 'km', 
      'gal': 'L',
      'lbs': 'kg',
      'km': 'mi',
      'L': 'gal',
      'kg': 'lbs'
    };

    // Attempt to find the value for the unit key
    result = unitConvMap[initUnit];

    // Set the result to null if the key wasn't in the dictionary
    if (result == undefined) result = null;
    
    return result;
  };

  // Return the spelled out version of the unit symbol
  this.spellOutUnit = function(unit) {
    let result;

    // Dictionary to convert the unit to its long form
    let unitSymbolToName = {
      'km': 'kilometers', 
      'L': 'liters',
      'kg': 'kilograms',
      'mi': 'miles',
      'lbs': 'pounds',
      'gal': 'gallons'
    };
    
    // Attempt to find the value for the unit key
    result = unitSymbolToName[unit];
    
    // Set the result to null if the key wasn't in the dictionary
    if (result == undefined) result = null;

    return result;
  };
  
  // Calculate the number to be returned after the conversion
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
  
  // Return the string that summarizes the conversion made in the convert handler
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
