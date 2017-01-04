var app = require('../../../app');
var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserUtils = require('../../utils/user');

var RecipeModel = require('../../../app/models/recipe');

describe('Unit: RecipeModel', function() {

  beforeEach(function(done) {
   UserUtils.clean(done);
  });

  it('should create a new recipe', function(done){
    UserUtils.createUserAndRecipe(function(user) {

      var recipe = {
        name: 'Test another',
        description: 'Lorem ipsum 2',
        ingredients: ['some', 'thing'],
        tags: ['another', 'thing'],
      }

      RecipeModel.CreateRecipe(user, recipe, function(err, user) {
        should.not.exist(err);
        should.exist(user);
        user.should.be.an('object');
        should.exist(user.recipes);
        user.recipes.should.be.an('array');
        user.recipes.length.should.equal(2);
        done();
      });

    });
  });

  it('should edit a existing recipe', function (done){
    UserUtils.createUserAndRecipe(function(user) {
     var id = user.recipes[0].id;
      var recipe = {
        name: 'Edited name',
        tags: ['so', 'many', 'more', 'tags'],
      };

      RecipeModel.EditRecipe(user, id, recipe, function(err, user) {
        should.not.exist(err);
        user.recipes.length.should.equal(1);
        user.recipes[0].name.should.equal('Edited name');
        user.recipes[0].tags.length.should.equal(4);
        done();
      });
    });
  });

  it('should error if editing a non-existing recipe', function(done) {
    UserUtils.createUserAndRecipe(function(user) {
     var id = mongoose.Types.ObjectId();
      var recipe = {
        name: 'Should Not Edit',
      };

      RecipeModel.EditRecipe(user, id, recipe, function(err, user) {
        should.exist(err);
        done();
      });
    });
  });

  it('should delete a existing recipe', function (done){
    UserUtils.createUserAndRecipe(function(user) {
      RecipeModel.DeleteRecipe(user, user.recipes[0].id, done);
    });
  });

  it('should error if deleting a non-existing recipe', function(done) {
    UserUtils.createUserAndRecipe(function(user) {
      should.exist(user);
      user.should.be.an('object');
      should.exist(user.recipes);
      user.recipes.should.be.an('array');
      RecipeModel.DeleteRecipe(user, mongoose.Types.ObjectId(), function(err){
        should.exist(err);
        done();
      });
    });
  });

});
