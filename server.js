const express = require('express');
const app = express();
const url = require('url');

const {checkPermission} = require('./src/main/authorization');

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
app.use(checkPermission());
  app.post('/login', login);
  app.get('/dummy', dummy);
  app.post('/dum', dummy);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});