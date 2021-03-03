const Book = require('../models/book.model');
const Logger = require('../config/logger');
const mongoose = require('mongoose');

module.exports.findBooks = async () => {
  try {
    Logger.info('******** INFO :: book helper :: findBooks ********');
    return await Book.find();
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: findBooks ********');
    Logger.info(error);
    return error;
  }
};

module.exports.checkValidId = async (id) => {
  try {
    Logger.info('******** INFO :: book helper :: checkValidId ********');
    return await mongoose.Types.ObjectId.isValid(id);
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: checkValidId ********');
    Logger.info(error);
    return error;
  }
};

module.exports.findBookById = async (id) => {
  try {
    Logger.info('******** INFO :: book helper :: findBookById ********');
    return await Book.find({ _id: Object(id)});
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: findBookById ********');
    Logger.info(error);
    return error;
  }
};

module.exports.deleteBookById = async (id) => {
  try {
    Logger.info('******** INFO :: book helper :: deleteBookById ********');
    return await Book.findOneAndDelete({ _id: Object(id) });
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: deleteBookById ********');
    Logger.info(error);
    return error;
  }
};

module.exports.addBook = async (bookData) => {
  try {
    Logger.info('******** INFO :: book helper :: addBook ********');
    const bookObj = Book(bookData);
    return bookObj.save();
  } catch (error) {
    Logger.info('******** ERROR :: book helper :: addBook ********');
    Logger.info(error);
    return error;
  }
};


