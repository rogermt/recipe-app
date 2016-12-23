var mongo = require('mongoose');
var validator = require('mongoose-validator');
var passwordHash = require('password-hash');
var _ = require('lodash');

var emailValidator = [
  validator({
    validator: 'isEmail',
    passIfEmpty: false,
    message: 'Email should be valid',
  }),
];

var passwordValidator = [
  validator({
    validator: 'isLength',
    arguments: [6],
    message: 'Password should have a minimum length of {ARGS[0]}',
  }),
];

module.exports = function() {
  var User = new mongo.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: emailValidator,
    },

    password: {
      type: String,
      required: true,
      validate: passwordValidator,
    },
  });

  User.methods.saltPassword = function() {
    if (!passwordHash.isHashed(this.password))
      this.password = passwordHash.generate(this.password);
  };

  User.pre('save', function(next) {
    this.saltPassword();
    next();
  });

  /**
   * Returns a boolean after checking if the given password
   * equals the hashed password.
   *
   * @param {string} password - The password to validate
   * @return bool
   */
  User.methods.validPassword = function(password) {
    return passwordHash.verify(password, this.password);
  };

  /**
   * Simple method of registering a user in the database.
   *
   * @param {object} properties - Should contain `email, password`
   * @param {fn} done - Callback, return `err, user`
   */
  User.statics.simpleRegister = function(properties, done) {
    new mongo.models.User(properties)
    .save(function(err, user) {
      if (err) return done(err);

      // Omit the password and conver to a plain object
      done(null, _.omit(user.toObject(), 'password'));
    });
  };

  return mongo.model('User', User);
};
