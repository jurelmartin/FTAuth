const {generateToken} = require('../src/main/authentication');
const Role = require('../src/_helper/role');
const url = require('url');


exports.login = (req, res, next) => {

    const userRole = Role.User
    const token = generateToken(1,"supersecretkey", '1h', '24hr');

    if (token === undefined) {
        console.log('error');
    }

    return res.status(200).json({status: "200", message: 'login success', token: token});
};

exports.issueNewToken = (req, res, next) => {

    const refreshToken = req.params.refreshToken;

    if (req.refreshToken === refreshToken)
    {
        const newToken = generateToken(req.userId, req.role, 'supersecretkey', '1h', '24h');
        res.status(200).json({message: "New token generated", token: newToken});
    }else{
        res.status(401).json({message: "failed to generate new token"});
    }
};


exports.dummy = (req, res, next) => {
    // for testing the routes ONLY
    res.json("you've reached dummy");

};