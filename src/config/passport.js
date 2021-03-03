const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const Author = require('../models/author.model');

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
};

const jwt = async (payload, done) => {
  try {
    const user = await Author.findOne({ _id: Object(payload.sub)});
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
