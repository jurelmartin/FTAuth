'use strict'

const httpMocks = require('node-mocks-http');
const {expect} = require('chai');

const {authentication} = require('../index');
const {authorization} = require('../index');
const Role = require('../src/_helper/role');

describe("FTAuth", function() {
    it('should generate token', () => {
        const token = authentication.generateToken(1, Role.User,"supersecretkey", '1h');
        expect(token).to.not.equal(undefined);
    });
    it('should not verify wrong token', () => {
        const token = authentication.verifyToken('19876rtfghnbmnlj', "supersecretkey");
        expect(token).to.equal("Invalid signature.");
    });
    it("should set the current user's role", () => {
        expect(authorization.setCurrentRole('Admin')).to.equal('Admin');
    });
    it("should check if user is authorized", () => {
        authorization.setCurrentRole('User')
    });
    
});