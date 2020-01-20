const url = require('url');

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

exports.filterPath = (paths = {}) => {
    return [
        (req, res, next) => {
                if (paths[userRole]){

                    const pathList = paths[userRole].paths.map((path) => {
                        const filter = url.format({
                            protocol: req.protocol,
                            host: req.get('host'),
                            pathname: path[1],
                        });
                        return [path[0],filter];
                    });

                        const requestPath = url.format({
                            protocol: req.protocol,
                            host: req.get('host'),
                            pathname: req.path,
                        });

                        pathList.forEach((path) => {
                            if (requestPath.includes(path[1]) && path[0] == req.method){
                                next();
                            }        
                        });

                        res.status(401).json({status: '401', message: "Unauthorized"});

                }else{
                    res.status(401).json({status: '401', message: "Unauthorized"});  
                }
        }
    ];

};

exports.setCurrentRole = (role) => {
    return userRole = role;
};

