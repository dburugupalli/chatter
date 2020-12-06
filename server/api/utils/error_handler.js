module.exports = errorHandler;
logger = require('./logger');

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        logger.fatal(err.message);
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    logger.fatal(err.message);
    return res.status(500).json({ message: "Some error occurred while processing. Please try later" });
}
