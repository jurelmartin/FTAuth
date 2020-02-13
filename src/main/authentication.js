const jwt = require('jsonwebtoken');

exports.generateToken = (id, key, accessTokenExpiration) => {
    try {
        const token = jwt.sign({
            id
        },
        key,{ expiresIn: accessTokenExpiration });

        return token;
    } 
    catch(err){
        return false;
    }
};

exports.verifyToken = (authHeader, key) => {
    let decodedToken, token;
    if (authHeader.includes('bearer') || authHeader.includes('Bearer')) {
        token = authHeader.split(' ')[1];
    }else
    {
        token = authHeader;
    }
    

    try {
        decodedToken = jwt.verify(token, key);
        return decodedToken;
    }
    catch (err) {
        return false;
    }
};
