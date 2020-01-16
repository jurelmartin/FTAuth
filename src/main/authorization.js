const jwt = require('jsonwebtoken');
const Role = require('../_helper/role')



exports.authorize = (roles = []) => {


    if (typeof roles === 'string'){
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(userRole)) {
                // user's role is not authorized
                return res.status(401).json({ status: "401" , message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];

};

exports.setRole = (role) => {
    return userRole = role;
};

