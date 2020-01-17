'use strict'

const mocks = require('node-mocks-http');
const data = require('../data')
const {expect} = require('chai');

const {authentication} = require('../index');
const {authorization} = require('../index');
const Role = require('../src/_helper/role');

describe("FTAuth", function() {
    it('should generate token', () => {
        const token = authentication.generateToken(1, Role.User,"supersecretkey", '1h', '24h');
        expect(token).to.not.equal(false);
    })
    it("should set the current user's role", () => {
        expect(authorization.setCurrentRole('Admin')).to.equal('Admin');
    });
    it("should check if user is authenticated", () => {
        const isAuthenticated = authentication.verifyToken('dummy authHeader', 'dummy key');
        expect(isAuthenticated).to.equal(false);   
    });
    it("should check if user is authorized", () => {
        authorization.setCurrentRole('User')

        const res = mocks.createResponse();
        const req = mocks.createRequest();
        const next = () => { };

        const data = authorization.checkUser('Admin'); 

        const mockFunction = data[0];

        mockFunction(req, res, next);


        const response = res._getJSONData();

        expect(response.status).to.equal('401');
    })
    
});