const httpStatus = require('http-status');
const {
  findBooks,
  checkValidId,
  findBookById,
  deleteBookById,
  addBook
} = require('../helpers/books.helper');
const { bookMessage } = require('../config/locales/en.json');
const Logger = require('../config/logger');
  
/**
 * Get books lists
 * @Author
 */

exports.getBooks = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: getBooks :: start ********');
    const booksObj = await findBooks();
    Logger.info('******** INFO :: book controller :: getBooks :: success ********');
    res.status(httpStatus.OK);
    return res.json({
      message: bookMessage.retrieved,
      count: booksObj.length,
      books: booksObj
    });
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: getBooks ********');
    Logger.error(error);
    return next(error);
  }
};


/**
 * Get books by id
 * @Author
 */
exports.getBookById = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: getBookById :: start ********');
    const { id } = req.params;
    const isValidId = await checkValidId(id);
    if (isValidId) {
      const bookObj = await findBookById(id);
      res.status(httpStatus.OK);
      return res.json({
        message: bookMessage.retrieved,
        books: bookObj
      });
    } else {
      res.status(httpStatus.NOT_FOUND);
      Logger.info('******** INFO :: book controller :: getBookById :: success ********');
      res.json({ message: bookMessage.invalidId });
    }
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: getBookById ********');
    Logger.error(error);
    return next(error);
  }
};

/**
 * Delete books by id
 * @Author
 */
exports.delete = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: delete :: start ********');
    const { id } = req.params;
    const isValidId = await checkValidId(id);
    if (isValidId) {
      const book = await findBookById(id);
      Logger.info(book)
      if (book.length === 0) {
        res.status(httpStatus.NOT_FOUND);
        return res.json({ message: bookMessage.notExist });
      } else {
        if (book[0].authorId.toString() === req.user._id.toString()) {
          await deleteBookById(id);
          res.status(httpStatus.OK);
          Logger.info('******** INFO :: book controller :: delete :: success ********');
          res.json({ message: bookMessage.deleted });
        } else {
          res.status(httpStatus.FORBIDDEN);
          return res.json({ message: bookMessage.unAuthorizedAuthor });
        };
      }
    } else {
      res.status(httpStatus.NOT_FOUND);
      res.json({ message: bookMessage.invalidId });
    }
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: delete ********');
    Logger.error(error);
    return next(error);
  }
};

/**
 * Add new book
 * @Author
 */
exports.create = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: book controller :: create :: start ********');
    const { title, description } = req.body;
    const authorId = req.user._id;
    const bookObj = {
      title,
      description,
      authorId
    };
    await addBook(bookObj);
    res.status(httpStatus.CREATED);
    Logger.info('******** INFO :: book controller :: create :: success ********');
    res.json({ message: bookMessage.created });
  } catch (error) {
    Logger.info('******** ERROR :: book controller :: create ********');
    Logger.error(error);
    return next(error);
  }
};
