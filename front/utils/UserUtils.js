var request = require('superagent');

function RegisterUser(email, password) {
  return new Promise(function(resolve, reject){
    request
    .post('/api/user/register')
    .send({email: email, password: password})
    .end(function(err, res){
      if(err) return reject(err);
      return resolve(res.body);
    });
  });
}

module.exports = {
  RegisterUser: RegisterUser,
}