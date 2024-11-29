// middlewares/asyncHandler.js
const {
    ParameterMissingError,
    ValidationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError
} = require("./customErrors");

function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(error => {
            console.log('error', error);
            if (error instanceof NotFoundError || error instanceof ParameterMissingError || error instanceof ValidationError || error instanceof AuthorizationError || error instanceof DatabaseError) {
                console.log('12', 12);
                res.status(error.statusCode).json({ message: error.message })
            } else {
                console.log('22', 22);
                res.status(500).json({ message: 'Internal Server Error' })
            }
        });
    };
}

module.exports = asyncHandler;