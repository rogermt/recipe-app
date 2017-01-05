import mongoose from 'mongoose';

export default (logger, config) => {
  mongoose.connect(config.mongo);
  logger.info('Connection opened with %s.', config.mongo);
};
