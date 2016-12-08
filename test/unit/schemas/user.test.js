var app = require('../../../app');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var should = require('chai').should();

describe('Unit: User Schema', function(){
 beforeEach(function(done) {
  // done();
  User.find({}).remove().exec(done);
 });
  
 it('should create a user', function(done){
   new User({
     email: 'test@example.com',
     password: 'somepassword',
   }).save( function(err, user) {
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
    }).save(function(err, user) {
      should.exist(err);
      should.not.exist(user);
      done();
    });
  });

  it('should create a user with a hashed password', function(done) {
    new User({
      email: 'some@example.com',
      password: '123456',
    }).save(function(err, user) {
      should.not.exist(err);
      should.exist(user);
      user.password.should.not.equal('123456');
      done();
    });
});
  
});