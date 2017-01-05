import passport from 'passport';
import omit from 'lodash/omit';

/**
 * Once hit, it means a successful login has been done.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
const HandlePostRequest = (req, res) =>
  res.json(omit(req.user.toObject(), ['recipes', 'password']));


export default (app) =>
  app.post('/api/user/login', passport.authenticate('local-login'), HandlePostRequest);
