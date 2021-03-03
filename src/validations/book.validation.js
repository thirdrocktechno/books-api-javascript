const Joi = require('joi');

module.exports = {
  // POST /books
  addBook: {
    body: {
      title: Joi.string().required().label('Title'),
      description: Joi.string().label('Description'),
    },
  },
};
