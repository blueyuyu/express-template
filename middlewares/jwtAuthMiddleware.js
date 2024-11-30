// src/middlewares/jwtAuthMiddleware.js
const { expressjwt: jwt } = require('express-jwt');
const customErrors = require('./customErrors');

module.exports = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
    // 令牌过期处理
    onExpired: async (req, err) => {
        if (new Date() - err.inner.expiredAt < 5000) { return; }
        throw err;
    }
}).unless({
    path: ['/api/auth/register', '/api/auth/login'] // 不需要验证的路径
});


// TODO 思考：在这段代码后面加入 bind，调用，是会报错的，思考原因
// TypeError [ERR_INVALID_ARG_TYPE]: The "callback" argument must be of type function. Received an instance of ServerResponse
// .bind(undefined, {
//     credentialsRequired: true,
//     getToken: function fromHeaderOrQuerystring(req) {
//         if (
//             req.headers.authorization &&
//             req.headers.authorization.split(' ')[0] === 'Bearer'
//         ) {
//             return req.headers.authorization.split(' ')[1];
//         }
//         return null;
//     },
// });