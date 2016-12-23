var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app, config, logger) {
  app.use(session({secret: config.session.secret}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    logger.info('Serializing user %s.', user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    logger.info('Finding user %s.', id);

    User.findById(id, function(err, user) {
      if (err) {
        logger.error('Error while finding user: %s', err.message || err);
      } else if (!user) {
        logger.error('Could not find user %s.', id);
      } else {
        logger.info('User found with id %s.', id);
      }

      done(err, user);
    });
  });

  // Define the local strategy for loggin in through an email and password
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, function authenticateUser(email, password, done) {
    // Find the user first before checking the password
    User.findOne({email: email}, function(err, user) {
      if (err) {
        logger.error('Error while authenticating user: %s', err.message || err);
        return done();
      }

      if (!user || !user.validPassword(password)) {
        logger.error('Invalid credentials supplied for user: %s', email);
        return done();
      }

      done(null, user);
    });
  }));
};
