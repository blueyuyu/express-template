// 具体的请求方法
// 控制层主要书写项目逻辑代码
const asyncHandler = require("../middlewares/asyncHandler");
const Contact = require("../models/contactModels");
const {
    ParameterMissingError,
    ValidationError,
    AuthorizationError,
    DatabaseError,
    NotFoundError
} = require("../middlewares/customErrors");


const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
})

const getContactById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ParameterMissingError('missing params id');
    }
    try {
        const contacts = await Contact.findById(id);
        if (contacts) {
            res.json(contacts);
        } else {
            res.json('not found')
        }
    } catch (error) {
        throw new NotFoundError('not found');
    }
})

const postContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        throw new ParameterMissingError('missing parameter');
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format.');
    }

    const newContact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(newContact);
})

const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ParameterMissingError('missing params id');
    }

    try {
        const result = await Contact.findByIdAndDelete(id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        throw new NotFoundError(error.message);
    }
}

module.exports = {
    getContact,
    getContactById,
    postContact,
    deleteContact
}