var supertest = require('supertest');
var app = require('../../../../app');
var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var mockUser = {
  email: 'test@example.com',
  password: 'abc1234',
};

describe('E2E: Api / User / Register', function() {
  // Remove all users and add our mock user
  beforeEach(function(done) {
    User.find({}).remove().exec(function(err) {
      should.not.exist(err);

      new User(mockUser).save(done);
    });
  });

  it('POST /api/user/register should not register an existing email', function(done) {
    supertest(app)
      .post('/api/user/register')
      .send(mockUser)
      .expect(409)
      .end(done);
  });

  it('POST /api/user/register should register valid values', function(done) {
    supertest(app)
      .post('/api/user/register')
      .send({email: 'another@example.com', password: 'somepassword'})
      .expect(200)
      .end(checkUser);

    function checkUser(err, res) {
      should.not.exist(err);
      should.exist(res.body.email);
      res.body.email.should.equal('another@example.com');
      should.equal(res.body.password, undefined);
      done();
    }
  });
});
