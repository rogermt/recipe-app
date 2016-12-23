var request = require('superagent');

function RegisterUser(email, password) {
  return new Promise(function(resolve, reject) {
    request
      .post('/api/user/register')
      .send({email: email, password: password})
      .end(function(err, res) {
        if (err) return reject(err);
        resolve(res.body);
      });
  });
}

function LoginUser(email, password) {
  return new Promise(function(resolve, reject) {
    request
      .post('/api/user/login')
      .send({email: email, password: password})
      .end(function(err, res) {
        if (err) return reject(err);
        resolve(res.body);
      });
  });
}

module.exports = {
  RegisterUser: RegisterUser,
  LoginUser: LoginUser,
};
