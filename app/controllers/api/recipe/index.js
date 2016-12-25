var passport = require('passport');
/**
 * Retuen list of recipes
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandleGetRequest(req, res) {
  res.json([
    {name: 'Recipe 1', description: 'Lorem Ipsum 1', created: Date.now() },
    {name: 'Recipe 2', description: 'Lorem Ipsum 2', created: Date.now() },
  ]);
}

module.exports = function(app) {
  app.get('/api/recipe', passport.authenticate('local-token'), HandleGetRequest);
};
