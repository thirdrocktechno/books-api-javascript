const Author = require('../models/author.model');
const Logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const {
  userMessage
} = require('../config/locales/en.json');
const httpStatus = require('http-status');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');

module.exports.findByEmailId = async (email) => {
  try {
    Logger.info('******** INFO :: user model :: findByEmailId ********');
    let authorObj = await Author.findOne({ email, isActive: true });
    return authorObj;
  } catch (error) {
    Logger.info('******** ERROR :: user model :: findByEmailId ********');
    Logger.info(error);
    return error;
  }
};

module.exports.passwordMatches = async (password, savedPassword) =>
  bcrypt.compare(password, savedPassword);

module.exports.token = async (id) => {
  const payload = {
    exp: moment().add(process.env.JWT_EXPIRATION_INTERVAL, 'days').unix(),
    iat: moment().unix(),
    sub: id,
  };
  return jwt.encode(payload, process.env.JWT_SECRET);
};

module.exports.transform = async (user) => {
  const transformed = {};
  const fields = ['id', 'firstName', 'lastName', 'gender', 'city'];
  fields.forEach((field) => {
    transformed[field] = user[field];
  });
  return transformed;
};

module.exports.login = async (user, password) => {
  if (password) {
    if (user && await this.passwordMatches(password, user.password)) {
      return { isSuccess: true, user: await this.transform(user), accessToken: await this.token(user._id) };
    }
    throw new ApiError(httpStatus.NOT_FOUND, userMessage.invalidCredential)
  }
};