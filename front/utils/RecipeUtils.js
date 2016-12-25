var request = require('superagent');

function RecipeIndex(token) {
  return new Promise(function(resolve, reject) {
    request
      .get('/api/recipe')
      .set('Authorization', 'Bearer ' + token)
      .end(function(err, res) {
        if (err) return reject(err);
          resolve(res.body);
      });
  });
}

module.exports = {
  RecipeIndex: RecipeIndex,
};
