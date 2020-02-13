'use strict'
const sinon  = require('sinon');
const {expect} = require('chai');
const jwt = require('jsonwebtoken');

const {authentication} = require('../index');

describe("FTAuth :: Authentication :: generateToken()", function() {
    context("when parameters are invalid", function() {
        it('return false', () => {
            const token = authentication.generateToken(1,"supersecretkey");
            expect(token).to.equal(false);
        });
    });
    context("when parameters are valid", function() {
        it('return token', () => {
            sinon.stub(jwt, 'sign');
            jwt.sign.returns(true);
            const token = authentication.generateToken(1,"supersecretkey", '1h');
            expect(token).to.equal(true);
            jwt.sign.restore();
        });
    });
});    
describe("FTAuth :: Authentication :: verifyToken()", function() {
    context("when parameters are invalid", function() {
        it('return false', () => {
            const token = authentication.verifyToken("dummy","supersecretkey");
            expect(token).to.equal(false);
        });
    });
    context("when parameters are valid", function() {
        it('return token', () => {
            sinon.stub(jwt, 'verify');
            jwt.verify.returns(true);
            const decodedToken = authentication.verifyToken("Bearer Token","supersecretkey");
            expect(decodedToken).to.equal(true);
            jwt.verify.restore();
        });
    });
});