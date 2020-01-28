const {getPath, getRequestUrl} = require('../_helper/paths');

let requestUrl, userRole;

exports.checkUser = (roles = [], paths = {}) => {


    if (typeof roles === 'string'){
        roles = [roles];
    }

    return [
        (req, res, next) => {
            if (roles.length && !roles.includes(userRole)) {
                // user's role is not authorized
                res.status(403).json({ status: "403" , message: 'Unauthorized' });
            }
            // authentication and authorization successful
            next();
        }
    ];

};

exports.checkPermission = () => {
    return [
        (req, res, next) => {
                    
            const pathList = getPath();
            const requestUrl = getRequestUrl();


            if(!userRole || !requestUrl || !pathList){
                return next();
            }

            for(path of pathList) {
                    if (path.url == requestUrl){ 
                        if (path.roles.includes(userRole)){
                            return next();
                        }else{
                            return res.status(403).json({status: 403, message: "Unauthorized"});
                        }
                    }
                }
            return next();
        }
    ];

};

exports.setCurrentRole = (role) => {
    return userRole = role;
};

