var mongoose = require('mongoose');
var User = mongoose.model('User');
var logger;

/**
 * Once hit, it will try and register the new user.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandlePostRequest(req, res) {
  User.count({email: req.body.email}, function(err, count) {
    if (err) {
      logger.error('An error occurred during registration of %s: %s', req.body.email, err.message || err);
      return res.status(500).send();
    }

    if (count !== 0) {
      return res.status(409).send();
    }

    User.simpleRegister(req.body, function(err, user) {
      if (err) {
        logger.error('An error occured after registration: %s', err.message || err);
        return res.status(500).send();
      }

      res.status(200).json(user);
    });
  });
}

module.exports = function(app, appLogger) {
  logger = appLogger;

  app.post('/api/user/register', HandlePostRequest);
};
