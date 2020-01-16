const jwt = require('jsonwebtoken');
const Role = require('../_helper/role');


let userRole;


exports.generateToken = (id, role, key) => {
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

exports.verifyToken = (token, key) => {
    try{
        const decrypt = jwt.verify(token, key);
        return decrypt;
    } catch (err){
        return ("Invalid signature.");
    }
};

