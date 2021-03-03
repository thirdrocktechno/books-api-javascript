const express = require('express');
const Validate = require('../../middlewares/validate');
const AuthController = require('../../controllers/auth.controller');
const {
  login
} = require('../../validations/auth.validation');

const router = express.Router();

router
  .route('/login')
  .post(Validate(login), AuthController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Author
 */

/**
* @swagger
* path:
*  /auth/login:
*    post:
*      description: Author login API
*      tags: [Author]
*      requestBody:
*         content:
*          application/json:
*            schema:
*               $ref: '#/components/schemas/LoginRequest'
*      security:
*         - bearerAuth: []
*      responses:
*        '200':
*          description: Success
*        '404':
*          description: Incorrect email or password
*/