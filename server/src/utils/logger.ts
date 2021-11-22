import winston from 'winston';
const { combine, timestamp, printf, errors, colorize, prettyPrint } = winston.format;
const date = new Date();

const todayString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `logs/${todayString}.log`,
      maxsize: 5 * 1024 * 1024, // 5MB
      format: combine(timestamp(), myFormat),
    }),
  ],
});

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: combine(
        errors({ stack: true }),
        timestamp(),
        colorize(),
        printf(({ level, message, timestamp, stack }) => {
          if (stack) {
            // print log trace
            return `${timestamp} ${level}: ${message} - ${stack}`;
          }
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
    }),
  );
}

export const stream = {
  write: (message: string) => logger.info(message),
};
