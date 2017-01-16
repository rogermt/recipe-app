import request from 'superagent';

const RegisterUser = (email, password) => {
  return new Promise( (resolve, reject) => {
    request
      .post('/api/user/register')
      .send({email: email, password: password})
      .end( (err, res) => {
        if (err) return reject(err);
        resolve(res.body);
      });
  });
}

const LoginUser = (email, password) => {
  return new Promise( (resolve, reject) => {
    request
      .post('/api/user/login')
      .send({email: email, password: password})
      .end( (err, res) => {
        if (err) return reject(err);
        resolve(res.body);
      });
  });
}

module.exports = {
  RegisterUser: RegisterUser,
  LoginUser: LoginUser,
};
