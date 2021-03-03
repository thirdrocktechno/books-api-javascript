const express = require('express');
const checkToken =  require('../../middlewares/auth');
const Validate = require('../../middlewares/validate');
const { addBook } = require('../../validations/book.validation');

// const Auth = require('../../middlewares/auth');
const BooksController = require('../../controllers/book.controller');

const router = express.Router();

router
  .route('/')
  .get(checkToken.authorize() , BooksController.getBooks);

module.exports = router;

router
  .route('/:id')
  .get( checkToken.authorize(), BooksController.getBookById);

router
  .route('/:id')
  .delete(checkToken.authorize(), BooksController.delete);

router
  .route('/')
  .post(Validate(addBook), checkToken.authorize(), BooksController.create);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Book
 */

/**
* @swagger
* path:
*  /books:
*    get:
*      description: Get books lists API
*      tags: [Book]
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Invalid jwt signature / ID found.
*/

/**
* @swagger
* path:
*  /books:
*    post:
*      description:  Create book API
*      tags: [Book]
*      requestBody:
*         content:
*          application/json:
*            schema:
*               $ref: '#/components/schemas/BookRequest'
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Invalid jwt signature / ID found.
*/

/**
* @swagger
* path:
*  /books/{bookId}:
*    get:
*      description: Get specific book API
*      tags: [Book]
*      parameters:
*         - in: path
*           name: bookId
*           type: integer
*           required: true
*           description: get book detail using bookId
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Invalid jwt signature / ID found.
*/

/**
* @swagger
* path:
*  /books/{bookId}:
*    delete:
*      description: Author can delete own book API
*      tags: [Book]
*      parameters:
*         - in: path
*           name: bookId
*           type: integer
*           required: true
*           description: delete book detail using bookId
*      security:
*         - ApiKeyAuth: []
*      responses:
*        '200':
*          description: Success
*        '401':
*          description: Access token is missing or invalid.
*/