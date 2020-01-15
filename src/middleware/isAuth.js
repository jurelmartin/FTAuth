const jwt = require('jsonwebtoken');

exports.generate = (id, isAdmin, key) => {
    try {
    const token = jwt.sign({
                    id: id,
                    isAdmin: isAdmin
                    },
                    key);
    return token;
    } catch(err){
        return ('Failed to generate token.');
    }
};

exports.verify = (token, key) => {
    try{
        const decrypt = jwt.verify(token, key);
        return decrypt;
    } catch (err){
        return ("Invalid signature.");
    }
};