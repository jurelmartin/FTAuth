const {getPath} = require('../_helper/paths');

let requestUrl, userRole;

exports.checkUser = (roles = [], paths = {}) => {


    if (typeof roles === 'string'){
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(userRole)) {
                // user's role is not authorized
                res.status(401).json({ status: "401" , message: 'Unauthorized' });
            }
            // authentication and authorization successful
            next();
        }
    ];

};

exports.setRequestUrl = (url) => {
    return requestUrl = url;
}

exports.checkPermission = () => {
    return [
        (req, res, next) => {
                    
            const pathList = getPath();


            for(path of pathList) {
                    if (path.url == requestUrl){ 
                        if (path.roles.includes(userRole)){
                            return next();
                        }
                    }
                }
                res.status(403).json({status: '403', message: "Unauthorized"});
        }
    ];

};

exports.setCurrentRole = (role) => {
    userRole = role;
};

