const {generate, verify} = require('../src/middleware/isAuth');
const Role = require('../src/_helper/role');


exports.login = (req, res, next) => {
const userRole = Role.User

const token = generate(1, userRole,"supersecretkey");

if (token === undefined) {
    console.log('error');
}

return res.status(200).json({status: "200", message: 'login success', token: token});
};

// exports.verify = () => {

// const value = verify(token, "supersecretkey");

// if (value === undefined) {
//     console.log('error');
// }

// console.log(value);
// };

exports.dummy = (req, res, next) => {    
    return res.status(200).json({status: "200", message: 'youve reached dummy.'});
    };