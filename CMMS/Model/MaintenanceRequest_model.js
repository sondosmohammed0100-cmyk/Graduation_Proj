const mongoose = require('mongoose');
const MaintReqSchema = new mongoose.Schema({
    issueDescription: {
        type: String,
        trim: true,
        required: true
    },
    priority: {
        type: String,
        enum: ['Emergency', 'Normal'],
        default: 'Normal',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending',
        required: true
    },
    
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const MaintReqModel = mongoose.model('MaintenanceRequest', MaintReqSchema);
module.exports = MaintReqModel;