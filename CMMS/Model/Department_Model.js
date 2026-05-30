const mongoose = require('mongoose');
const DepSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    }
}, { timestamps: true });

const DepartmentModel = mongoose.model('Department', DepSchema);
module.exports = DepartmentModel;