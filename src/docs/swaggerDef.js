const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'NodeJS Book service',
    version,
    license: {
    },
  }
};

module.exports = swaggerDef;
