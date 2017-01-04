var supertest = require('supertest');
var app = require('../../../../app');
var should = require('chai').should();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var mockUser = {
  email: 'test@example.com',
  password: 'abc1234',
  token: 'abc1234',
  recipes: [
    {name: 'Test', description: 'Description for Recipe Test 1'},
  ]
};

describe('E2E: Api / Recipe / Index', function() {
  // Remove all users and add our mock user
  beforeEach(function(done) {
    User.find({}).remove().exec(function(err) {
      should.not.exist(err);

      new User(mockUser).save(done);
    });
  });

  it('GET /api/recipe should return 200 on valid credentials', function(done) {
    supertest(app)
      .get('/api/recipe')
      .set('Authorization', 'Bearer ' + mockUser.token)
      .expect(200)
      .end(done);
  });

  it('GET /api/recipe should return the user recipes', function(done) {
    supertest(app)
      .get('/api/recipe')
      .set('Authorization', 'Bearer ' + mockUser.token)
      .end(function(err, res){
        should.not.exist(err);
        res.body.length.should.equal(1);

        should.exist(res.body[0].name);
        should.exist(res.body[0].description);
        should.exist(res.body[0].creation);

        res.body[0].name.should.equal('Test');

        done();
      });
  });

  it('POST /api/recipe should create a new recipe', function(done) {
    supertest(app)
      .post('/api/recipe')
      .set('Authorization', 'Bearer ' + mockUser.token)
      .send({name: 'POST name'})
      .expect(302)
      .end(function(err) {
        should.not.exist(err);

        User.findOne({email: 'test@example.com'}, function(err, user) {
          should.not.exist(err);
          user.recipes.length.should.equal(2);
          user.recipes[1].name.should.equal('POST name');
          done();
        });
      });
  });

});
