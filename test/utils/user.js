var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');

function createUserAndRecipe(done){
  User.simpleRegister({
    email: 'another@example.com',
    password: '123456',
  }, function(err, user){

    should.not.exist(err);
    should.exist(user);

    var params = {
        name: 'Test Recipe',
        description: 'Loren ipsum',
        ingredients: ['carrot', 'mushroom'],
        tags: ['lunch', 'main'],
    }

    user.recipes.push(params);

    user.save(function(err) {
      should.not.exist(err);
      done(user);
    });
  });
}

function clean (done){
  User.find({}).remove().exec(done);
}

module.exports = {
  createUserAndRecipe: createUserAndRecipe,
  clean: clean,
};
