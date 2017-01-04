var _ = require('lodash');

function CreateRecipe(user, record, done) {
  user.recipes.push(record);
  user.save(done);
}

function EditRecipe(user, id, changes, done) {
  var recipeIndex = _.findIndex(user.recipes, function(recipe) {
    return recipe.id === (id.toString ? id.toString() : id);
  });

  if (recipeIndex === -1) return done(Error('Recipe does not exist.'));

  _.each(changes, function(value, key) {
    user.recipes[recipeIndex][key] = value;
  });

  user.save(done);
}

function DeleteRecipe(user, id, done) {
  var recipeIndex = _.findIndex(user.recipes, function(recipe) {
    return recipe.id === (id.toString ? id.toString() : id);
  });

  if (recipeIndex === -1) return done(Error('Recipe does not exist.'));

  user.recipes[recipeIndex].remove();
  user.save(done);
}

module.exports = {
  CreateRecipe: CreateRecipe,
  EditRecipe: EditRecipe,
  DeleteRecipe: DeleteRecipe,
};
