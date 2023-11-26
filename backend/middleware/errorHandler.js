// For invalid url
const notFound = (req, res, next) => {
    const err = new Error(`Resource not found: ${req.originalUrl}`);
    res.status(404);
    next(err);
}

// For all errors thrown
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // For weird MongoDB error
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    
    res.status(statusCode).json({
        message, 
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}

module.exports = { notFound, errorHandler }