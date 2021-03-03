const express = require('express');
const authRoute = require('./auth.route');
const BookRoute = require('./book.route');
const DocsRoute = require('./docs.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/books', BookRoute);    
router.use('*/docs', DocsRoute);

module.exports = router;
