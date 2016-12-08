var supertest = require('supertest');
var app = require('../../app');

describe('E2E: API user/login', function() {
  it('GET / should return status = 200', function(done) {
    supertest(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
