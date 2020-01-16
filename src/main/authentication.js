const jwt = require('jsonwebtoken');
const Role = require('../_helper/role');

exports.generateToken = (id, role, key, accessTokenExpiration, refreshTokenExpiration) => {
    try {

    const refreshToken = jwt.sign({},key,{expiresIn: refreshTokenExpiration});
    const token = jwt.sign({
            id,
            role,
            refreshToken
            },
            key,
            {
                expiresIn: accessTokenExpiration
    });
    const tokenResponse = {
        "token": token,
        "refreshToken": refreshToken 
    }

    return tokenResponse;
    } catch(err){
        return (undefined);
    }
};

exports.verify = (res, req, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {

      decodedToken = jwt.verify(token, "supersecretkey");
      return decodedToken;
    } catch (err) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    
    // req.decodedToken = decodedToken;
    // req.userId = decodedToken.id;
    // req.role = decodedToken.role;
    // req.refreshToken = decodedToken.refreshToken;
    

    };
