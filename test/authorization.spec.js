'use strict'

const mocks = require('node-mocks-http');
const sinon  = require('sinon');
const {expect} = require('chai');

const {authorization, paths} = require('../index');

describe("FTAuth :: Authorization :: setCurrentRole() & getCurrentRole()", function() {
    context("when setCurrentRole() is called", function() {
        it("getCurrentRole should get the data", () => {
            authorization.setCurrentRole('Admin')
            expect(authorization.getCurrentRole()).to.equal('Admin');
        });
    });
});
describe("FTAuth :: Authorization : CheckPermission()", function() {
    context("when no request url/user role/pathlist provided", function() {
        it("return next()", () => { 
            const nextSpy = sinon.spy();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({}, {}, nextSpy);
            
            expect(nextSpy.calledOnce).to.be.true;
        })
    });
    context("when path is not on the list", function() {
        it("return next()", () => {
            authorization.setCurrentRole('User')

            paths.setRequestUrl('urls.com');

            paths.setPath([
                {roles: ['User'], url: "url.com"}
            ])
    
            const nextSpy = sinon.spy();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({}, {}, nextSpy);
            
            expect(nextSpy.calledOnce).to.be.true;
        });
    });
    context("when path is on the list and roles match", function() {
        it("return next()", () => {
            authorization.setCurrentRole('Admin')

            paths.setRequestUrl('url.com');

            paths.setPath([
                {roles: ['Admin'], url: "url.com"}
            ])
    
            const nextSpy = sinon.spy();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({}, {}, nextSpy);
            
            expect(nextSpy.calledOnce).to.be.true;
        });
    });
    context("when path is on the list  but roles don't match", function() {
        it("return 403", () => {
            authorization.setCurrentRole('User')

            paths.setRequestUrl('url.com');

            paths.setPath([
                {roles: ['Admin'], url: "url.com"}
            ])
    
            const res = mocks.createResponse();
    
            const data = authorization.checkPermission(); 
    
            const mockFunction = data[0];
    
            mockFunction({},res, {});
            
            const response = res._getJSONData();
    
            expect(response.status).to.equal(403);
        });
    });
});    
describe("FTAuth :: Authorization : CheckUser()", function() {
    context("when path is on the list but roles don't roles match", function() {
        it("return 403", () => {
            let data, response, mockFunction, res, req, next;

            authorization.setCurrentRole('User')

            paths.setRequestUrl('url.com');

            paths.setPath([
                {role: 'User', url: "url.com"}
            ])
    
            res = mocks.createResponse();
            req = mocks.createRequest();
            next = () => { };
    
            data = authorization.checkUser('Admin'); 
    
            mockFunction = data[0];
    
            mockFunction(req, res, next);
    
    
            response = res._getJSONData();
    
            expect(response.status).to.equal('403');


            data = authorization.checkUser(['Admin', 'User']); 
    
            mockFunction = data[0];
    
            mockFunction(req, res, next);
    
    
            response = res._getJSONData();
    
            expect(response.status).to.equal('403');
        });
    })
    context("when user is authorized", function() {
        it("return next()", () => {
            authorization.setCurrentRole('User')

            const nextSpy = sinon.spy();

            const data = authorization.checkUser('User'); 

            const mockFunction = data[0];

            mockFunction({}, {}, nextSpy);
        
            expect(nextSpy.calledOnce).to.be.true;
        })
    })
});
    // describe("checkUser()", function() {
    // it("should check if user is authorized", () => {
    //     authorization.setCurrentRole('User')

    //     const nextSpy = sinon.spy();

    //     const data = authorization.checkUser('User'); 

    //     const mockFunction = data[0];

    //     mockFunction({}, {}, nextSpy);
        
    //     expect(nextSpy.calledOnce).to.be.true;
    // })
    // it("should check if user is not authorized", () => {
    //     authorization.setCurrentRole('User')

    //     const res = mocks.createResponse();
    //     const req = mocks.createRequest();
    //     const next = () => { };

    //     const data = authorization.checkUser('Admin'); 

    //     const mockFunction = data[0];

    //     mockFunction(req, res, next);


    //     const response = res._getJSONData();

    //     expect(response.status).to.equal('403');
    // })
    // })