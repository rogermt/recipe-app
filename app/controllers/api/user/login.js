var passport = require('passport');
var _ = require('lodash');

/**
 * Once hit, it means a successful login has been done.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandlePostRequest(req, res) {
  res.json(_.omit(req.user.toObject(), 'password'));
}

module.exports = function(app) {
  app.post('/api/user/login', passport.authenticate('local-login'), HandlePostRequest);
};
