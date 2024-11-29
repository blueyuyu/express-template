const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please add the contact email"]
    },
    password: {
        type: String,
        required: [true, "please add the contact password"]
    },
}, {
    timestamps: true
});

// 存储用户之前加密密码
userSchema.pre('save', async function (next) {
    if (!this.markModified('email')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

module.exports = mongoose.model('User', userSchema);