const {generateToken, newToken} = require('../src/main/authentication');
const Role = require('../src/_helper/role');


exports.login = (req, res, next) => {
const userRole = Role.User

const token = generateToken(1, userRole,"supersecretkey", '1h');

if (token === undefined) {
    console.log('error');
}

return res.status(200).json({status: "200", message: 'login success', token: token});
};

exports.issueNewToken = (req, res, next) => {
    const userRole = Role.User

    const refreshToken = req.params.refreshToken;

    const token = newToken(refreshToken, req.decodedToken);

    if (token === undefined) {
        console.log('error');
    }
    
    return res.status(200).json({status: "200", message: 'issue new token success', token: token});
};


exports.dummy = (req, res, next) => {    
    return res.status(200).json({status: "200", message: 'youve reached dummy.'});
    };