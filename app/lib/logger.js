import winston from 'winston';

export default (config) => {
  const logger = new winston.Logger({
    transports: [new winston.transports.Console(config.logger)]
  });

  logger.info('Winston logger initialized.');
  return logger;
};
