const authentication = require('./src/main/authentication');
const authorization = require('./src/main/authorization')
const {setPaths} = require('./src/_helper/paths')

module.exports = {
    authentication,
    authorization,
    setPaths
}