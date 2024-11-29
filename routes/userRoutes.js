// 用户信息，账号，密码，查询
const express = require("express")
const router = express.Router();

const asyncHandler = require("../middlewares/asyncHandler.js");
const {
    userLogin,
    userRegister,
    getUserInfo } = require("../controllers/userControllers.js");
    
// User login
router.route('/login').post(asyncHandler(userLogin));

// User Register
router.route('/register').post(asyncHandler(userRegister));

// get UserInfo
router.route('/userInfo').get(asyncHandler(getUserInfo));


module.exports = router;