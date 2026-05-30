const mongoose = require('mongoose');
const MaintSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Preventive', 'Corrective', 'Calibration', 'Emergency'],
        required: true
    },
    maintenanceDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Completed', 'In Progress', 'Pending'],
        required: true,
        default: 'Pending'
    },
    notes: {
        type: String,
        trim: true
    },
    
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },
  
    workOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkOrder',
        required: true
    }
}, { timestamps: true });

const MaintenanceModel = mongoose.model('Maintenance', MaintSchema);
module.exports = MaintenanceModel;