const jwt = require('jsonwebtoken');



exports.generate = (id, role, key) => {
    try {
    const token = jwt.sign({
                    id,
                    role
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