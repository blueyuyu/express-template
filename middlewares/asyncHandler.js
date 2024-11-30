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

            //TODO token过期校验,可能有问题，之后再改进
            if (error.name === 'UnauthorizedError') {
                if (new Date() - error.inner.expiredAt < 5000) {
                    console.log('Token will expire in less than 5 seconds.');
                    // 可以在这里添加刷新令牌的逻辑
                    return res.status(401).json({ message: 'Token will expire soon. Please refresh your token.' });
                }
                return res.status(401).json({ message: 'Invalid or missing token.' });
            }
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