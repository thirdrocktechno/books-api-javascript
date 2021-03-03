const Author = require('../author.model');
const Book = require('../book.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BooksData = require('./book.seeder');
const Logger = require('../../config/logger');


const url = process.env.MONGO_URL;
mongoose.connect(url, {
  keepAlive: 1,
  useNewUrlParser: true,
});

// Exit application on error
mongoose.connection.on('error', (err) => {
  Logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});
mongoose.set('debug', true);

const authors = [
  {
    firstName: 'Gautam',
    lastName: 'Ajani',
    email: 'gautam@gmail.com',
    password: 'Admin@123',
    gender: 'male',
    city: 'surat'
  },
  {
    firstName: 'Jenish',
    lastName: 'Patel',
    email: 'jensh@gmail.com',
    password: 'Admin@456',
    gender: 'male',
    city: 'Ahmedabad'
  }
]

const formateBookObj = async (ids) => {
  Logger.info('*********** INFO :: form Book object ***********');
  let updateBookData = [];
  Logger.info('lENGTH :: ', BooksData.length)
  for (let i = 0; i < BooksData.length; i++) {
    Logger.info('index :: ', i)
    if (i < 5) {
      Logger.info(i);
      
      BooksData[i].authorId = ids[0]
      updateBookData.push(BooksData[i])
    } else {
      BooksData[i].authorId = ids[1]
      updateBookData.push(BooksData[i])
    }
  }
  return updateBookData;
}

const addAuthor = async (authors) => {
  try {
    Logger.info('*********** INFO :: add Authors ***********');
    let authorsArr = [];
    for (author of authors) {
      author.password = await bcrypt.hash(author.password, 10);
      authorsArr.push(author);
    }
    const authorObj = await Author.insertMany(authorsArr);
    let ids = [];
    Logger.info('*********** Authors Objects ***********');
    Logger.info(authorObj);
    authorObj.map(author => {
      ids.push(author._id)
    })
    let books = await formateBookObj(ids);
    const BooksObj = await Book.insertMany(books);
    Logger.info('*********** Books Objects ***********');
    Logger.info(BooksObj);
    return mongoose.disconnect();
  } catch (error) {
    Logger.info('*********** ERROR :: add Authors ***********');
    Logger.error(error);
    return error;
  }
};

addAuthor(authors)
