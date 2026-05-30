const mongoose = require('mongoose');
const workOrderSchema = new mongoose.Schema({
    assignedDate: {
        type: Date
    },
    completionDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'Assigned', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending',
        required: true
    },
    maintenanceRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaintenanceRequest',
        required: true
    },
    assignedEngineer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTechnician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const WorkOrderModel = mongoose.model('WorkOrder', workOrderSchema);
module.exports = WorkOrderModel;