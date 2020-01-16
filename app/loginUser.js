const {generateToken, newToken} = require('../src/main/authentication');
const Role = require('../src/_helper/role');


exports.login = (req, res, next) => {
const userRole = Role.User

const token = generateToken(1, userRole,"supersecretkey", '1h', '24h');

if (token === undefined) {
    console.log('error');
}

return res.status(200).json({status: "200", message: 'login success', token: token});
};

exports.issueNewToken = (req, res, next) => {

    const refreshToken = req.params.refreshToken;

    if (req.refreshToken === refreshToken)
    {
        const newToken = generateToken(req.userId, req.role, 'supersecretkey', '1h');
        res.status(200).json({message: "New token generated", token: newToken});
    }else{
        res.status(401).json({message: "failed to generate new token"});
    }
    // const userRole = Role.User



    // const token = newToken(refreshToken, req.decodedToken);

    // if (token === undefined) {
    //     console.log('error');
    // }
    
    // return res.status(200).json({status: "200", message: 'issue new token success', token: token});
};


exports.dummy = (req, res, next) => {    
    return res.status(200).json({status: "200", message: 'youve reached dummy.'});
    };