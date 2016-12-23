var winston = require('winston');

module.exports = function (config) {
  var logger = new winston.Logger({
    transports: [new winston.transports.Console(config.logger)]
  });

  logger.info('Winston logger initialized.');
  return logger;
};
