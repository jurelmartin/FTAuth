const express = require('express');
const app = express();

const {authorize} = require('./src/main/authorization');

const Role = require('./src/_helper/role');

const {login} = require('./app/loginUser');

const {verifyToken} = require('./src/main/authentication');

const {setRole} = require('./src/main/authorization');

const {dummy} = require('./app/loginUser');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/login', login);
app.use('/', (req, res, next) => {
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

req.userId = decodedToken.id;
req.role = decodedToken.role;

console.log(req.role);

setRole(req.role)

next();
},authorize([Role.User, Role.Admin]),dummy);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});