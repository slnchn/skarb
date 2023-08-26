import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'skarb.log' }),
  ],
});

export const decorateWithArgsLogger =
  (func) =>
  (...args) => {
    try {
      logger.info(`${func.name} called`);
      const result = func(...args);
      logger.info(`${func.name} successfully executed`);
      return result;
    } catch (error) {
      logger.error(`${func.name} failed with error: ${error}`);
      throw error;
    }
  };
