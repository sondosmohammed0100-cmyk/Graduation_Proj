const mongoose = require('mongoose');

const WorkOrderSchema = new mongoose.Schema({
    assignedDate: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending',
        required: true
    },
    notes: {
        type: String,
        trim: true
    },
   
    maintenanceRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaintenanceRequest',
        required: true
    },
    
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const WorkOrderModel = mongoose.model('WorkOrder', WorkOrderSchema);
module.exports = WorkOrderModel;