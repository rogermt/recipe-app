import mongoose from 'mongoose';
import omit from 'lodash/omit';

const User = mongoose.model('User');
let logger;

/**
 * Once hit, it will try and register the new user.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
const HandlePostRequest = (req, res) =>
  User.count({email: req.body.email}, (err, count) => {
    if (err) {
      logger.error('An error occurred during registration of %s: %s', req.body.email, err.message || err);
      return res.status(500).send();
    }

    if (count !== 0) {
      return res.status(409).send();
    }

    User.simpleRegister(req.body, (err, user) => {
      if (err) {
        logger.error('An error occured after registration: %s', err.message || err);
        return res.status(500).send();
      }

      res.status(200).json(omit(user.toObject(), ['recipes', 'password']));
    });
  });


export default (app, appLogger) => {
  logger = appLogger;
  app.post('/api/user/register', HandlePostRequest);
}
