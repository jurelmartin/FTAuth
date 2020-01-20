const express = require('express');
const app = express();
const url = require('url');

const {checkUser, filterPath} = require('./src/main/authorization');

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


app.use(tokenChecker);
app.use(filterPath({
  Admin: {
      paths: [
        ["POST","/"],
        ["GET","/login"],
        ["GET","/log"]
        ["GET", "/tok"]
      ]},
  User: {
      paths: [
        ["GET","/tok"],
        ["GET","/token"]
      ]
  }
  }));

app.use('/token/:refreshToken',issueNewToken);
app.use('/token',dummy);
app.use('/tok',dummy);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});