var supertest = require('supertest');
var app = require('../../../../app');
var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var mockUser = {
  email: 'test@example.com',
  password: 'abc1234',
};

describe('E2E: Api / User / Login', function() {
  // Remove all users and add our mock user
  beforeEach(function(done) {
    User.find({}).remove().exec(function(err) {
      should.not.exist(err);

      new User(mockUser).save(done);
    });
  });

  it('POST /api/user/login should return 200 on valid credentials', function(done) {
    supertest(app)
      .post('/api/user/login')
      .send(mockUser)
      .expect(200)
      .end(checkUser);

    function checkUser(err, res) {
      should.not.exist(err);
      should.exist(res.body.email);
      res.body.email.should.equal('test@example.com');
      should.equal(res.body.password, undefined);
      done();
    }
  });

  it('POST /api/user/login should return 401 on invalid credentials', function(done) {
    supertest(app)
      .post('/api/user/login')
      .send({email: 'invalid@example.com', password: 'invalidpassword'})
      .expect(401)
      .end(done);
  });

  it('POST /api/user/login should return 401 on invalid password', function(done) {
    supertest(app)
      .post('/api/user/login')
      .send({email: mockUser.email, password: 'invalidpassword'})
      .expect(401)
      .end(done);
  });
});
