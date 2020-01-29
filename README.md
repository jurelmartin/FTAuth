
# FTAuth 
[![Build Status](https://travis-ci.com/jurelmartin/FTAuth.svg?branch=master)](https://travis-ci.com/jurelmartin/FTAuth)
[![Coverage Status](https://coveralls.io/repos/github/jurelmartin/FTAuth/badge.svg?branch=master)](https://coveralls.io/github/jurelmartin/FTAuth?branch=master)
[![npm version](https://badge.fury.io/js/ftauth.svg)](https://badge.fury.io/js/ftauth)

Final Task - Authentication and Authorization

## Install
    $ npm install ftauth

## Usage

This package provides a function that acts as a middleware that you can use for Authenticating and Authorizing User depending on their Role (Admin, User).

Example of How to use the functions, 

For Creating a token, use function generateToken(id, key, accessTokenExpiration)

```javascript
const { authentication } = require('ftauth');

(req, res, next) => {

    const userRole = Role.User
    const token = authentication.generateToken(userData.dataValues.id, process.env.KEY, process.env.ACCESS_TOKEN_EXP, process.env.REFRESH_TOKEN_EXP);

    if (token === undefined) {
        console.log('error');
    }

    return res.status(200).json({status: "200", message: 'login success', token: token});
};
```

For Verifying token, use function verifyToken (authHeader, key)

```javascript

const { authentication } = require('ftauth');


(req, res, next) => { 
    const authHeader = req.get('Authorization');

    const decodedToken = verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
        return res.status(403).json({ status: "401" , message: 'Not Authenticated' });
    }
    // put the decoded refresh token to request
    req.refreshToken = decodedToken.refreshToken;

    // set User's role for the checkUser function
    setCurrentRole(decodedToken.role);

    next();

};
```
## Restrict authentication access

Assign paths that are subject to authentication by using setPath(path={}) function. setPath needs a specific object as parameter:

```javascript
    {roles: ['Admin'], method: 'GET', url: '/api/users'}
```
Use checkPath(url, requestMethod) to check if the request url matches the paths on the list.

```javascript
    const { paths } = require('ftauth')

    const pathExist = paths.checkPath(req.originalUrl, req.method);

```
use SetCurrenRole(role) to set the user's role which can be accessed by the module. This is important as authoraztion function checks on a user's role to execute. 
```javascript
    const { authorization } = require('ftauth');
    
    authorization.SetCurrentRole('Admin');
```

Use checkPermission() function as middleware to check if the request is authorized. Take note that this only works if the authentication functions are already initiated as it is dependent to data created upon authentication.

```javascript
const { authorization } = require('ftauth');
const { Router, static } = require('express');


module.exports () => { 
    router = Router();
    
    router.use(authorization.checkPermission());
    
    return router;

};
```


### Using it as a middleware

```javascript
const {authentication, paths} = require('ftauth');


module.exports = (req, res, next) => {

  paths.setPath([
    {roles: ['Admin'], method: 'GET', url: '/api/users'}, 
    {roles: ['Admin'], method: 'GET', url: '/api/user?id=' + req.query.id}, 
    {roles: ['Admin', 'User', 'Profile'], method: 'PUT', url: '/api/update?id=' + req.query.id},
    {roles: ['Admin'], method: 'DELETE', url: '/api/delete?id='+ req.query.id}
  ]);

  const pathExist = paths.checkPath(req.originalUrl, req.method);

  if(pathExist){
    const authHeader = req.get('Authorization');
    // gets the decoded token from verify function
    const decodedToken = authentication.verifyToken(authHeader, 'supersecretkey');

    if (!decodedToken) {
      return res.status(401).json({ status: 401, message: 'Not Authenticated' });
    }

    req.userId = decodedToken.id;

  }

  next();
};
```