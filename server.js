const express = require('express');
const app = express();

const {checkUser} = require('./src/main/authorization');

const Role = require('./src/_helper/role');

const {login, issueNewToken, dummy} = require('./app/loginUser');

const tokenChecker = require('./tokenChecker')


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
app.use('/token/:refreshToken',tokenChecker, issueNewToken);
app.use('/', tokenChecker ,checkUser(Role),dummy);

app.listen(3000, () => {
    console.log('Listening on port 3000');

});