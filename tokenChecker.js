const {verify} = require('./src/main/authentication');
const {setCurrentRole} = require('./src/main/authorization')


module.exports = (req, res, next) => { 
    const authHeader = req.get('Authorization');
//  gets the decoded token from verify function
    const decodedToken = verify(authHeader);

    if (!decodedToken) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }

    console.log(decodedToken);

    req.refreshToken = decodedToken.refreshToken;

// set User's role for the checkUser function
    setCurrentRole(decodedToken.role);

    next();

}
