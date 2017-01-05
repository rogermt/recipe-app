import session from 'express-session';
import connectRedis from 'connect-redis';

connectRedis(session);

export default (app, config) => {
  app.use(session(config.session));
};
