import winston from 'winston';
import path from 'path';

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     new winston.transports.Console(), //to see log in terminal also
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(process.cwd(),'logs','winston','success.log'), level: 'info' })
    ]
});

const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),  
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(process.cwd(),'logs','winston','error.log'), level: 'error' })
    ]
});

export {
    logger,
    errorLogger
};