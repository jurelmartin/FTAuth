const {verifyToken, checkPath} = require('./src/main/authentication');
const {setCurrentRole} = require('./src/main/authorization');
const {setPath} = require('./src/_helper/paths');


module.exports = (req, res, next) => { 
    setPath([
        {roles: ['Admin'], method: 'GET', url: '/dummy'}
    ]);

    const pathExist = checkPath(req.originalUrl, req.method);

    if(pathExist){
    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
        return res.status(403).json({ status: "403" , message: 'Not Authenticated' });
    }
    // put the decoded refresh token to request
    req.refreshToken = decodedToken.refreshToken;

    // set User's role for the checkUser function
    setCurrentRole("User");

    }

    next();

}
