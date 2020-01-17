const jwt = require('jsonwebtoken');

exports.generateToken = (id, role, key, accessTokenExpiration, refreshTokenExpiration) => {
    try {
        const refreshToken = jwt.sign({},key,{expiresIn: refreshTokenExpiration});
        const token = jwt.sign({
            id,
            role,
            refreshToken
        },key,{ expiresIn: accessTokenExpiration });
        const tokenResponse = {
            "token": token,
            "refreshToken": refreshToken 
        }
        return tokenResponse;
    } 
    catch(err){
        return false;
    }
};

exports.verifyToken = (authHeader, key) => {
    if (!authHeader) {
        return false;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, key);
        return decodedToken;
    }
    catch (err) {
        return false;
    }
};
