var supertest = require('supertest');
var app = require('../../../../app');
var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var session = supertest(app);

var mockUser = {
  email: 'test@example.com',
  password: 'abc1234',
};

describe('E2E: Api / User / Logout', function() {
  // Remove all users and add our mock user
  beforeEach(function(done) {
    function loginMockUser(err) {
      should.not.exist(err);
      session
        .post('/api/user/login')
        .send(mockUser)
        .expect(200)
        .end(done);
    }

    User.find({}).remove().exec(function(err) {
      should.not.exist(err);

      new User(mockUser).save(loginMockUser);
    });
  });

  it('GET /api/user/logout should return 200 on logout', function(done) {
    session
      .get('/api/user/logout')
      .expect(200)
      .end(done);
  });
});
