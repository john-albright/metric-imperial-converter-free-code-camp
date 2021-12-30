const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

    suite('Integration tests with chai-http', function() {

        // #1: 10 L --> 2.64172 gallons
        test('Test GET /api/convert with 10L', function(done) {
            chai
                .request(server)
                .get('/api/convert?input=10L')
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'Response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be of type json');
                    assert.equal(res.body.initNum, 10, 'The initial number should be 10');
                    assert.equal(res.body.initUnit, 'L', 'The initial unit should be "L"');
                    assert.equal(res.body.returnNum, 2.64172, 'The return number should be 10');
                    assert.equal(res.body.returnUnit, 'gal', 'The return unit should be "gal"');
                    done();
                })
        });

        // #2: 32g --> invalid unit
        test('Test GET /api/convert with 32g', function(done) {
            chai
                .request(server)
                .get('/api/convert?input=32g')
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'Response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be of type json');
                    assert.equal(res.text, '"invalid unit"', 'The message should be "invalid unit"');
                    done()
                });
        });

        // #3: 3/7.2/4kg --> invalid number
        test('Test GET /api/convert with 3/7.2/4kg', function(done) {
            chai
                .request(server)
                .get('/api/convert?input=3/7.2/4kg')
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'Response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be of type json');
                    assert.equal(res.text, '"invalid number"', 'The message should be "invalid number"');
                    done()
                });
        });

        // #4: 3/7.2/4kilomegagram --> invalid number and unit 
        test('Test GET /api/convert with 3/7.2/4kilomegagram', function(done) {
            chai
                .request(server)
                .get('/api/convert?input=3/7.2/4kilomegagram')
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'Response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be of type json');
                    assert.equal(res.text, '"invalid number and unit"', 'The message should be "invalid unit"');
                    done()
                });
        });

        // #5 kg 
        test('Test GET /api/convert with kg', function(done) {
            chai
                .request(server)
                .get('/api/convert?input=kg')
                .end(function(err, res) {
                    assert.equal(res.status, 200, 'Response status should be 200');
                    assert.equal(res.type, 'application/json', 'Response should be of type json');
                    assert.equal(res.body.initNum, 1, 'The initial number should be 1');
                    assert.equal(res.body.initUnit, 'kg', 'The initial unit should be "kg"');
                    assert.equal(res.body.returnNum, 2.20462, 'The return number should be 10');
                    assert.equal(res.body.returnUnit, 'lbs', 'The return unit should be "lbs"');
                    done()
                });
        });

    });

});
