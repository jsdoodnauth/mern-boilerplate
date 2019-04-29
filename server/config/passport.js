const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('./config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_JUICE
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
        return done(null, false);
      }).catch(err => console.error(err));
    })
  );
};
