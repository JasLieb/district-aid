//const logger = require('../factories/loggerFactory');
const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.File({
            filename: './logs/all-logs.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new transports.File({
            filename: './logs/http-logs.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5,
            level: 'http'
        }),
        new transports.Console()
    ]
});

var morganFormat = (tokens, req, res) => 
    [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');

logger.stream = {
    write: message => {
        logger.info(message.substring(0, message.lastIndexOf('\n')))
    }
};

module.exports = morgan(
    morganFormat,
    { stream: logger.stream }
);
