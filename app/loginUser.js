const {generate, verify} = require('../src/middleware/isAuth');


const token = generate(1, 3,"supersecretkey");

if (token === undefined) {
    console.log('error');
}

console.log(token);

const value = verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6MywiaWF0IjoxNTc5MDU0ODMwfQ.GLH0v_BEKbcpk6W_AnCaCQkzMvT80PnM6AxPRptj_P1", "supersecretkey");

if (value === undefined) {
    console.log('error');
}

console.log(value);