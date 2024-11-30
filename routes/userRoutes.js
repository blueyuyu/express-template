// 用户信息，账号，密码，查询
const express = require("express")
const router = express.Router();

const asyncHandler = require("../middlewares/asyncHandler.js");
const {
    userLogin,
    userRegister,
    getUserInfo } = require("../controllers/userControllers.js");
// 在route层，对express 进行功能校验
const { body, validationResult } = require('express-validator');

// User login
router.route('/login').post(
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    asyncHandler(userLogin));

// User Register
router.route('/register').post(
    [
        body('email').isEmail().withMessage('Invalid email format'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    asyncHandler(userRegister));

// get UserInfo
router.route('/userInfo').get(asyncHandler(getUserInfo));


module.exports = router;