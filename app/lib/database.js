var mongoose = require('mongoose');

module.exports = function(logger, config) {
  mongoose.connect(config.mongo);
  logger.info('Connection opened with %s.', config.mongo);
};