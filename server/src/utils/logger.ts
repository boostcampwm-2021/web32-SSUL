import winston from 'winston';
const { combine, timestamp, printf, label } = winston.format;
const date = new Date();
const todayString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: `logs/${todayString}.log`,
      maxsize: 5 * 1024 * 1024, // 5MB
      format: combine(label({ label: 'MAIN' }), timestamp(), myFormat),
    }),
  ],
});

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      format: combine(label({ label: 'DEBUG' }), timestamp(), myFormat),
    }),
  );
}

export const stream = {
  write: (message: string) => logger.info(message),
};
