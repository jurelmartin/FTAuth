const {verify} = require('./src/main/authentication');
const {setCurrentRole} = require('./src/main/authorization')
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => { 
    let decodedToken;
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    const token = authHeader.split(' ')[1];
    try {
      decodedToken = jwt.verify(token, "supersecretkey");
    } catch (err) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }

// //  gets the decoded token from verify function
// const decodedToken = verify();

console.log(decodedToken);

req.refreshToken = decodedToken.refreshToken;

// set User's role for the checkUser function
setCurrentRole(decodedToken.role);

next();

}
