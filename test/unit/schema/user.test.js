var app = require('../../../app');
var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserUtils = require('../../utils/user');

describe('Unit: User Schema', function() {
  beforeEach(function(done) {
    User.find({}).remove().exec(done);
  });

  it('should create a user', function(done) {
    new User({
      email: 'test@example.com',
      password: 'somepassword',
      token: 'abc123',
    }).save(function(err, user) {
      should.not.exist(err);
      should.exist(user);
      user.email.should.equal('test@example.com');
      done();
    });
  });

  it('should have a unique email address', function(done) {
    function createUser(done) {
      new User({
        email: 'test@example.com',
        password: 'somepassword',
        token: 'abc123',
      }).save(done);
    }

    createUser(function(err, user) {
      should.not.exist(err);
      should.exist(user);

      createUser(function(err, user) {
        should.exist(err);
        should.not.exist(user);
        done();
      });
    });
  });

  it('should not create a user with an invalid email address', function(done) {
    new User({
      email: 'invalid.email',
      password: 'somepassword',
      token: 'abc123',
    }).save(function(err, user) {
      should.exist(err);
      should.not.exist(user);
      done();
    });
  });

  it('should have a minimum password length of 6', function(done) {
    new User({
      email: 'some@example.com',
      password: '12345',
      token: 'abc123',
    }).save(function(err, user) {
      JSON.stringify(err).indexOf('Password should have a minimum length of 6').should.not.equal(-1);
      should.exist(err);
      should.not.exist(user);
      done();
    });
  });

  it('should create a user with a hashed password', function(done) {
    new User({
      email: 'some@example.com',
      password: '123456',
      token: 'abc123',
    }).save(function(err, user) {
      should.not.exist(err);
      should.exist(user);
      user.password.should.not.equal('123456');
      done();
    });
  });

  it('should register a user', function(done) {
    User.simpleRegister({
      email: 'another@example.com',
      password: '123456',
      token: 'abc123',
    }, function(err, user) {
      should.not.exist(err);
      should.exist(user);
      user.email.should.equal('another@example.com');
      should.exist(user._id);
      should.exist(user.token);
      //should.equal(user.password, undefined);
      done();
    });
  });

  describe('Recipe', function() {

    it('should create a recipe', function(done){

      UserUtils.createUserAndRecipe(function(user) {
        user.recipes.length.should.equal(1);
        user.recipes[0].name.should.equal('Test Recipe');
        user.recipes[0].description.should.equal('Loren ipsum');

        user.recipes[0].ingredients.length.should.equal(2);
        user.recipes[0].ingredients.length.should.equal(2);

        should.exist(user.recipes[0].creation)

        done();
        });
      });

    it('should edit a recipe', function(done){
      UserUtils.createUserAndRecipe(function(user) {
        user.recipes[0].name = 'Another name';
        user.save(function(err, user){
          should.not.exist(err);
          user.recipes[0].name.should.equal('Another name');
          done();
        });
      });
    });

    it('should delete a recipe', function(done){
      UserUtils.createUserAndRecipe(function(user) {
        user.recipes[0].remove();
        user.save(function(err, user){
          should.not.exist(err);
          user.recipes.length.should.equal(0);
          done();
        });
      });
    });

    });






});
