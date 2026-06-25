const mongoose = require('mongoose');
const sysRole = require('../Utils/SystemRoles')
const userSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    Lname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: [sysRole.ADMIN, sysRole.BIOENG, sysRole.TECH, sysRole.STAFF],
        default: sysRole.STAFF
    },
    profile: {
        public_id: String,
        secure_url: String
    },
    token: {
        type: String
    },
    forgetCode: {
        type: String,
        default: null
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;