const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    serialNumber: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    manufacturer: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    supplier: {
        type: String,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 50
    },
    status: {
        type: String,
        enum: ['Working', 'Maintenance', 'Down'],
        default: 'Working',
        required: true
    },
    priority: {
        type: String,
        enum: ['Critical', 'Normal'],
        default: 'Normal',
        required: true
    },
    purchaseDate: {
        type: Date
    },
    
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    maintContract: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract'
    }
}, { timestamps: true });

const DeviceModel = mongoose.model('Device', DeviceSchema);
module.exports = DeviceModel;