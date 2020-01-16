const jwt = require('jsonwebtoken');
const Role = require('../_helper/role')

let userRole;

exports.generate = (id, role, key) => {
    try {
    const token = jwt.sign({
                    id,
                    role
                    },
                    key);
    return token;
    } catch(err){
        return (undefined);
    }
};

exports.verify = (token, key) => {
    try{
        const decrypt = jwt.verify(token, key);
        return decrypt;
    } catch (err){
        return ("Invalid signature.");
    }
};

exports.setRole = (role) => {
    return userRole = role;
};

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

}