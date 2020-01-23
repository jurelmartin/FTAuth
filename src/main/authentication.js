const jwt = require('jsonwebtoken');
const {getPath} = require('../_helper/paths')
const {setRequestUrl} = require('../main/authorization')

exports.generateToken = (id, key, accessTokenExpiration, refreshTokenExpiration) => {
    try {
        const refreshToken = jwt.sign({},key,{expiresIn: refreshTokenExpiration});
        const token = jwt.sign({
            id,
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

exports.checkPath = (requestUrl, requestMethod) =>{

    setRequestUrl(requestUrl);

    const pathList = getPath();
    for(path of pathList) {
        if (path.url == requestUrl && path.method == requestMethod){ 
            return true;
        }        
    }
    return false;
}

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
