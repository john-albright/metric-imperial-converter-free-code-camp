'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;
    // console.log(input);

    let validNum = true;
    let validUnit = true;
  
    // Try to extract the input number and unit
    // Attempt to convert the initial unit to a spelled-out form 
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);

    //if (spelledOutInitUnit != null && initNum == null && input == initUnit) initNum = 1;

    // Check to see if the number and unit entered are valid
    if (spelledOutInitUnit == null) validUnit = false;
    if (/*validUnit && */ initNum == null) validNum = false;

    //console.log(validUnit, validNum);

    // Return an error message if the number and/or unit are invalid
    if (!validNum && !validUnit) return res.json("invalid number and unit");
    if (!validUnit) return res.json("invalid unit");
    if (!validNum) return res.json("invalid number");

    // Make sure the returned number always displays with 5 decimal places of accuracy
    let returnNum = convertHandler.convert(initNum, initUnit); 
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    let string = convertHandler.getString(initNum, spelledOutInitUnit, returnNum, spelledOutReturnUnit);

    let object = {
      'initNum': initNum,
      'initUnit': initUnit,
      'returnNum': returnNum,
      'returnUnit': returnUnit,
      'string': string
    };

    // console.log(object);
    
    res.json(object);

  });

};