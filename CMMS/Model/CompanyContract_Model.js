const mongoose = require('mongoose');
const contractSchema = new mongoose.Schema({
    nameCompany: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    companyPhone: {
        type: String,   
        required: true,
        trim: true
    }
}, { timestamps: true });

const ContractModel = mongoose.model('Contract', contractSchema);
module.exports = ContractModel;