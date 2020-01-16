const jwt = require('jsonwebtoken');
const Role = require('../_helper/role');

exports.generateToken = (id, role, key, expiration) => {
    try {
    const token = jwt.sign({
                    id,
                    role
                    },
                    key,
                    {
                        expiresIn: expiration
                    });
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

