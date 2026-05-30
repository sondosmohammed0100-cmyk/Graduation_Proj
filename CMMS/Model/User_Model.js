const mongoose = require('mongoose');
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
        enum: ['Admin', 'BiomedicalEngineer', 'Technician', 'Staff'],
        default: 'Staff'
    },
    profile: {
        public_id: String,
        secure_url: String
    },
    token: {
        type: String
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;