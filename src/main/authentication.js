const jwt = require('jsonwebtoken');
const Role = require('../_helper/role');

let tokenRecords = {};

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
    const refreshToken = jwt.sign({
            id,
            role
            },
            key,
            {
                expiresIn: '24hr'
    });
    const tokenResponse = {
        "token": token,
        "refreshToken": refreshToken 
    }
    tokenRecords[refreshToken] = tokenResponse;
    return tokenResponse;
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

exports.newToken = (refreshToken) => {
    try {

        
        if((refreshToken) && (refreshToken in tokenRecords)) {
            const token = jwt.sign({
                id,
                role
                },
                key,
                {
                    expiresIn: expiration
            });
            const newTokenResponse = {
                "token": token
            }
            tokenRecords[bodyData.refreshToken].token = token;
            return newTokenResponse;
        }
    }catch (err){
        return ("Invalid refresh token.");
    }


};

