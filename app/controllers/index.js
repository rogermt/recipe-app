/**
 * Handles the raw GET request from the route.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
const HandleGetRequest = (req, res) => {
  res.status(200).send();
}

export default (app, config) => {
  app.get('/', HandleGetRequest);
};
