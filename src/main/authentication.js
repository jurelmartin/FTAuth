const jwt = require('jsonwebtoken');
const Role = require('../_helper/role');

exports.generateToken = (id, role, key, expiration) => {
    try {

    const refreshToken = jwt.sign({},key,{expiresIn: '24hr'});
    const token = jwt.sign({
            id,
            role,
            refreshToken
            },
            key,
            {
                expiresIn: expiration
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

exports.verifyToken = (token, key) => {
    try{
        const decrypt = jwt.verify(token, key);
        return decrypt;
    } catch (err){
        return ("Invalid signature.");
    }
};

// exports.newToken = (refreshToken, decodedToken) => {

//     try {    
//         const list = tokenRecords.map((x) => {return x.refreshToken});

//         if((refreshToken) && (refreshToken in list)) {
//             const token = jwt.sign({
//                 id: decodedToken.id,
//                 role: decodedToken.role
//                 },
//                 key,
//                 {
//                     expiresIn: '24h'
//             });
//             const newTokenResponse = {
//                 "token": token
//             }
//             tokenRecords[refreshToken].token = token;
//             return newTokenResponse;
//         }
//     }catch (err){
//         return ("Invalid refresh token.");
//     }


// };

