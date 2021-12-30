const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    // #1: convertHandler should correctly read a whole number input.
    test('whole number input', function() {
        assert.isNotNull(convertHandler.getNum("3"), 'getNum("3") is not null');
    });

    // #2: convertHandler should correctly read a decimal number input.
    test('decimal number input', function() {
        assert.isNotNull(convertHandler.getNum("0.1"), 'getNum("0.1") is not null');
    });

    // #3: convertHandler should correctly read a fractional input.
    test('fractional input', function() {
        assert.isNotNull(convertHandler.getNum("1/2"), 'getNum("1/2") is not null');
    });

    // #4: convertHandler should correctly read a fractional input with a decimal.
    test('fractional input with a decimal', function() {
        assert.isNotNull(convertHandler.getNum("1.4/2.7"), 'getNum("1.4/2.7") is null');
    });

    // #5: convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test('double-fraction input', function() {
        assert.isNull(convertHandler.getNum("1/2/3"), 'getNum("1/2/3") is null');
    });

    // #6: convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test('no numerical input', function() {
        assert.equal(convertHandler.getNum(""), 1, 'getNum() automatically assigns 1 when no numberical input is provided');
    });

    // #7: convertHandler should correctly read each valid input unit.
    test('valid unit input', function() {
        assert.isNotNull(convertHandler.getUnit("gal"), 'getUnit("gal") is correctly read');
        assert.isNotNull(convertHandler.getUnit("L"), 'getUnit("L") is correctly read');
        assert.isNotNull(convertHandler.getUnit("km"), 'getUnit("km") is correctly read');
        assert.isNotNull(convertHandler.getUnit("mi"), 'getUnit("mi") is correctly read');
        assert.isNotNull(convertHandler.getUnit("lbs"), 'getUnit("lbs") is correctly read');
        assert.isNotNull(convertHandler.getUnit("kg"), 'getUnit("kg") is correctly read');
    });

    // #8: convertHandler should correctly return an error for an invalid input unit.
    test('invalid unit input', function() {
        assert.isNull(convertHandler.getReturnUnit("ga"), 'getUnit("ga") returns an error');
    });

    // #9: convertHandler should return the correct return unit for each valid input unit.
    test('correct return unit', function() {
        assert.equal(convertHandler.getReturnUnit("gal"), 'L', 'getReturnUnit("gal") returns "L"');
        assert.equal(convertHandler.getReturnUnit("L"), 'gal', 'getReturnUnit("L") returns "gal"');
        assert.equal(convertHandler.getReturnUnit("km"), 'mi', 'getReturnUnit("km") returns "mi"');
        assert.equal(convertHandler.getReturnUnit("mi"), 'km', 'getReturnUnit("mi") returns "km"');
        assert.equal(convertHandler.getReturnUnit("lbs"), 'kg', 'getReturnUnit("lbs") returns "kg"');
        assert.equal(convertHandler.getReturnUnit("kg"), 'lbs', 'getReturnUnit("kg") returns "lbs"');
    });

    // #10: convertHandler should correctly return the spelled-out string unit for each valid input unit.
    test('correct spelled-out string', function() {
        assert.equal(convertHandler.spellOutUnit("gal"), 'gallons', 'spellOutUnit("gal") returns "gallons"');
        assert.equal(convertHandler.spellOutUnit("L"), 'liters', 'spellOutUnit("L") returns "liters"');
        assert.equal(convertHandler.spellOutUnit("km"), 'kilometers', 'spellOutUnit("km") returns "kilometers"');
        assert.equal(convertHandler.spellOutUnit("mi"), 'miles', 'spellOutUnit("mi") returns "miles"');
        assert.equal(convertHandler.spellOutUnit("lbs"), 'pounds', 'spellOutUnit("lbs") returns "pounds"');
        assert.equal(convertHandler.spellOutUnit("kg"), 'kilograms', 'spellOutUnit("kg") returns "kilograms"');
    });

    // #11: convertHandler should correctly convert gal to L.
    test('convert gallons to liters correctly', function() {
        assert.equal(convertHandler.convert(1, "gal"), 3.78541, 'convert(1, "gal") returns 3.7584');
    });

    // #12: convertHandler should correctly convert L to gal.
    test('convert liters to gallons', function() {
        assert.equal(convertHandler.convert(1, "L"), 0.26417, 'convert(1, "L") returns 0.26417');
    });

    // #13: convertHandler should correctly convert mi to km.
    test('convert miles to kilometers correctly', function() {
        assert.equal(convertHandler.convert(1, "mi"), 1.60934, 'convert(1, "mi") returns 1.60934');
    });

    // #14: convertHandler should correctly convert km to mi.
    test('convert kilometers to miles correctly', function() {
        assert.equal(convertHandler.convert(1, "km"), 0.62137, 'convert(1, "gal") returns 3.7584');
    });

    // #15: convertHandler should correctly convert lbs to kg.
    test('convert pounds to kilograms correctly', function() {
        assert.equal(convertHandler.convert(1, "lbs"), 0.45359, 'convert(1, "lbs") returns 0.453592');
    });

    // #16: convertHandler should correctly convert kg to lbs.
    test('convert kilograms to pounds correctly', function() {
        assert.equal(convertHandler.convert(1, "kg"), 2.20462, 'convert(1, "kg") returns 2.20462');
    });

});