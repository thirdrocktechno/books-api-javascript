const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

let envName = process.env.NODE_ENV
if (envName === undefined) { //default to "development"
    envName = "development"
}

const envVars = require(`./env/${envName}.js`);

module.exports = envVars;
