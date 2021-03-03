const httpStatus = require('http-status');
const { findByEmailId, login } = require('../helpers/auth.helper');
const { userMessage } = require('../config/locales/en.json');
const Logger = require('../config/logger');

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    Logger.info('******** INFO :: auth controller :: login :: start ********');
    const { email, password } = req.body;
    let authorObj = await findByEmailId(email)
    if (authorObj.length === 0) {
      res.status(httpStatus.NOT_FOUND)
      res.json({ message: util.format(userMessage.notExist, email) });
    } else {
      const {user, accessToken } = await login(authorObj, password)
      res.status(httpStatus.OK);
      Logger.info('******** INFO :: auth controller :: login :: Success ********');
    return res.json({ accessToken, data: user });
    }
  } catch (error) {
    Logger.info('******** ERROR :: auth controller :: login ********');
    Logger.error(error)
    return next(error);
  }
};
