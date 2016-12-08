var passport = require('passport');

/**
 * Once hit, it means a successful login has been done.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandlePostRequest(req, res) {
  res.status(200).send();
}

module.exports = function(app) {
  app.post('/api/user/login', passport.authenticate('local-login'), HandlePostRequest);
};