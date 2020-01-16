'use strict'

const {expect} = require('chai');

const {generate, verify} = require('../src/main/isAuth');
const Role = require('../src/_helper/role');

describe("#FTAuth", function() {
    it('should generate token', function() {
        const token = generate(1, Role.User,"supersecretkey");
        expect(token).to.not.equal(undefined);
    });
});