const { emit } = require('nodemon');
const asyncHandler = require('../middlewares/asyncHandler');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const User = require('../models/userModels');
const {
    ParameterMissingError,
    ValidationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError
} = require("../middlewares/customErrors");

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw ParameterMissingError("missing parameter");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw ValidationError("email format does not meet specifications")
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ValidationError('Invalid email')
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new ValidationError("Invalid email or password")
        }

        // 创建jwt,expiresIn: 过期时间为8h
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        throw new DatabaseError({ message: error.message })
    }
})

const userRegister = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw ParameterMissingError("missing parameter");
    }

    // 校验邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        throw ValidationError("email format does not meet specifications")
    }

    const findUser = await User.findOne({ email });
    if (findUser) {
        throw DatabaseError("the email has been registered");
    }

    try {
        const newUser = await User.create({
            email,
            password
        })
        // 对密码进行加密
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        throw DatabaseError(error.message);
    }
})

const getUserInfo = asyncHandler(async (req, res) => {
    // 根据给定的token解析出当前对象，并且返回对象的信息
    try {
        // 从req.user中获取用户ID
        // console.log('req', req.auth, req.auth.userId);
        const userId = req.auth.userId;
        // 从数据库中查找用户
        const user = await User.findById(userId).select('-password'); // 排除密码字段

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 返回用户信息
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = {
    userLogin,
    userRegister,
    getUserInfo
}