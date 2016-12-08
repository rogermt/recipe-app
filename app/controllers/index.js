/**
 * Handles the raw GET request from the route.
 *
 * @param {object} req - Express req
 * @param {object} res - Express res
 */
function HandleGetRequest(req, res) {
  res
    .status(200)
    .send();
}

module.exports = function (app, config) {
  app.get('/', HandleGetRequest);
};