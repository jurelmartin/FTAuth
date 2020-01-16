const {verifyToken} = require('../src/main/authentication');
const {setCurrentRole} = require('../src/main/authorization');



exports.verifyMiddleware = (req, res, next) => {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
        }
        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
          decodedToken = verifyToken(token, "supersecretkey");
        } catch (err) {
            return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
        }
        if (!decodedToken) {
            return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
        }
        req.decodedToken = decodedToken;
        req.userId = decodedToken.id;
        req.role = decodedToken.role;
        req.refreshToken = decodedToken.refreshToken;
        
        setCurrentRole(req.role)
        next();
        };
    
    

 