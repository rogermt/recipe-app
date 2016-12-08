var passport = require('passport');

/**
 * Once hit, it means a successful logout has been done.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandleGetRequest(req, res) {
  req.session.regenerate(function(){
    req.logout();
    res.status(200).send();
  });
}

module.exports = function(app) {
  app.get('/api/user/logout', HandleGetRequest);
};