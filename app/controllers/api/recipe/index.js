var passport = require('passport');
/**
 * Retuen list of recipes
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandleGetRequest(req, res) {

    res.json(req.user.recipes);

}

module.exports = function(app) {
  app.get('/api/recipe', passport.authenticate('local-token'), HandleGetRequest);
};
