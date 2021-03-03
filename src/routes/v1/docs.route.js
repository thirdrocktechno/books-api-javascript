const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const SwaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: SwaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

let options = {
  swaggerOptions: {
    explorer: true,
    showMutatedRequest: false,
    requestInterceptor: request => {
      request.headers.requestfromswagger = true;
      request.headers.swaggerAPIUrl = request.url;
      return request;
    },
    tagsSorter: (tag1, tag2) => {
      let tagsOrder = ["Environment", "ECDSA Helper", "Public Key", "Samples"];
      const sortResult = tagsOrder.indexOf(tag1) - tagsOrder.indexOf(tag2);
      return sortResult;
    },
    operationsSorter: (route1, route2) => {
      let methodsOrder = ["put", "patch", "get", "post", "delete"];
      let sortResult = methodsOrder.indexOf(route1.get("method")) - methodsOrder.indexOf(route2.get("method"));

      if (sortResult === 0) {
        sortResult = route1.get("path").localeCompare(route2.get("path"));
      }
      return sortResult;
    }
  }
};

router.use('/', swaggerUi.serve);
router.get(
  '/',
  (req, res, next) => {
    const protocol = (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "https") ? req.headers['x-forwarded-proto'] : req.protocol;
    const originalUrl = req.originalUrl ? req.originalUrl.split('docs')[0] : '/';
    const url = protocol + '://' + req.get('host') + originalUrl;
    specs.servers = [{
      url: url
    }];
    req.swaggerDoc = specs;
    next();
  },
  swaggerUi.setup(specs, options)
);

module.exports = router;
