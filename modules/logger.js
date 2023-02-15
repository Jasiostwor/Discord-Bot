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

const logger = pino()
logger.file = fileLogger

module.exports = logger;