const express = require('express');
const app = express();

const {checkUser} = require('./src/main/authorization');

const Role = require('./src/_helper/role');

const {login, issueNewToken, dummy} = require('./app/loginUser');

const {verifyToken} = require('./src/main/authentication');

const {setCurrentRole} = require('./src/main/authorization');

// const {dummy} = require('./app/loginUser');


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
app.use('/token/:refreshToken', (req, res, next) => {
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
  
  setCurrentRole(req.role)
  
  next();
  }, issueNewToken);
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

setCurrentRole(req.role)

next();
},checkUser(Role),dummy);

app.listen(3000, () => {
    console.log('Listening on port 3000');
    setCurrentRole('User');
    const result = checkUser('Admin');
    console.log(checkUser(roles = ['Admin']));
});