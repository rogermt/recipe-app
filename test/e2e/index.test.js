var supertest = require('supertest');
var app = require('../../app');

describe('E2E: Index', function() {
  it('GET / should return 200', function(done) {
    supertest(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
