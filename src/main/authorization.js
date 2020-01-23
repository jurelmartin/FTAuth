const url = require('url');
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
    requestUrl = url;
}

exports.checkPermission = (url, role) => {
    const Role = role || userRole;
    const getUrl = url || requestUrl
    return [
        (req, res, next) => {
                    
            const pathList = getPath();

            for(path of pathList) {
                    if (path.url == getUrl && path.method == requestMethod){ 
                        if (path.roles.includes(Role)){
                            break;
                        }else{
                            res.status(403).json({status: '403', message: "Unauthorized"});
                        }
                    }
                }
                next();
        }
    ];

};

exports.filterMethod = (methods = {}) => {
    return [
        (req, res, next) => {
            if(methods[userRole]){
                if(methods[userRole].includes(req.method)){
                    next();
                }else{
                    res.status(401).json({status: '401', message: "Unauthorized"});
                }
            }else{
                res.status(401).json({status: '401', message: "Unauthorized"});  
            }
        }
    ]
}

exports.setCurrentRole = (role) => {
    userRole = role;
};

