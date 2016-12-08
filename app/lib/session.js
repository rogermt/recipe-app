var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = function(app, config) {
  app.use(session(config.session));
};