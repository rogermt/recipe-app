/**
 * Once hit, it means a successful logout has been done.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
const HandleGetRequest = (req, res) => {
  req.logout();
  res.status(200).send();
}
  
export default (app) =>
  app.get('/api/user/logout', HandleGetRequest);
