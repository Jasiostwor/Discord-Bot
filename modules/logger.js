const pino = require('pino');

const fileLogger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        destination: './log.json'
      }
    }
  });
const logger = pino();


const log = {

  info: (msg) => {
    logger.info(msg);
    fileLogger.info(msg);
  },

  error: (msg) => {
    logger.error(msg);
    fileLogger.error(msg);
  },

  debug: (msg) => {
    logger.debug(msg);
    fileLogger.debug(msg);
  },

  warn: (msg) => {
    logger.warn(msg);
    fileLogger.warn(msg);
  },

};

module.exports = log;