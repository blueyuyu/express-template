// 模型层，与数据库对接
// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "please add the contact email"]
    },
    phone: {
        type: String,
        required: [true, "please add the contact phone"]
    },
    // password: {
    //     type: String,
    //     required: [true, "please add the contact password"]
    // },
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);