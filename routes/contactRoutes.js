// 请求的get post delete 的抽离
// 路由层对接口
const express = require("express")
const router = express.Router();
const {
    getContact,
    getContactById,
    postContact,
    deleteContact
} = require('../controllers/contactControllers.js');


// GET 请求：获取所有项目
router.route('/items').get(getContact);

// GET 请求：获取单个项目
router.route('/items/:id').get(getContactById);

// POST 请求：添加新项目
router.route('/items').post(postContact);

// DELETE 请求：删除项目
router.route('/items/:id').delete(deleteContact);

module.exports = router;