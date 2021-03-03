const httpStatus = require('http-status');
const passport = require('passport');
const { userMessage } = require('../config/locales/en.json');

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  if (error && error.name === 'TokenExpiredError') {
    error.message = jwt.expired;
  }
  if (!user) {
    res.status = httpStatus.UNAUTHORIZED
    return res.json({ message: userMessage.unauthorized })
  } else {
    req.user = user;
    return next();
  }
};

exports.authorize = () => (req, res, next) => {
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next),
  )(req, res, next);
};