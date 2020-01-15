const {generate, verify} = require('../src/middleware/isAuth');
const Role = require('../src/_helper/role');


const userRole = Role.User

const token = generate(1, userRole,"supersecretkey");

if (token === undefined) {
    console.log('error');
}

console.log(token);

const value = verify(token, "supersecretkey");

if (value === undefined) {
    console.log('error');
}

console.log(value);