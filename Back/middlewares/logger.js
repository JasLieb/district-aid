const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');

const isFilledBody = (body) => body && Object.keys(body).length > 0;

const checkBody = (body) => {
    if(isFilledBody(body)){
        var checkedBody = body;
        if(body.password) delete checkedBody.password;
        return "body : " + JSON.stringify(checkedBody);
    }
    return "Nobody content";
}

const checkHeader = (headers) => {
    const checkedHeaders = headers;
    delete checkedHeaders.authorization;

    return JSON.stringify(checkedHeaders);
};

// See https://github.com/winstonjs/winston/issues/614
// Adding logger for a specific level

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
            maxFiles: 5
        }),
        new transports.File({
            filename: './logs/error-logs.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5,
            level: 'error'
        }),
        new transports.File({
            filename: './logs/http-logs.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5,
            level: 'info'
        }),
        new transports.Console()
    ]
});

morgan.token('reqContent', (req) => [checkHeader(req.headers), checkBody(req.body)].join(' '));

const morganFormat = (tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms', '-',
        tokens.reqContent(req)
    ]
    .join(' ');
}

logger.stream = {
    write: message => {
        logger.info(message.substring(0, message.lastIndexOf('\n')))
    }
};

module.exports = {
    log: logger,
    morgan: morgan(
        morganFormat,
        { stream: logger.stream }
    )
}
