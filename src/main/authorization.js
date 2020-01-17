const jwt = require('jsonwebtoken');
const Role = require('../_helper/role')
const sinon = require('sinon');

exports.checkUser = (roles = []) => {


    if (typeof roles === 'string'){
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(userRole)) {
                // user's role is not authorized
                res.status(401).json({ status: "401" , message: 'Unauthorized' });
            }
            // authentication and authorization successful
            next();
        }
    ];

};

exports.setCurrentRole = (role) => {
    return userRole = role;
};

