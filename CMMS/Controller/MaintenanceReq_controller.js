const { asyncHandler } = require('../Utils/AsyncHandler');
const AppError = require('../Utils/AppError');
const MaintReqModel = require('../Model/MaintenanceRequest_model');
const DeviceModel = require('../Model/Devices_Model');


const createRequest = asyncHandler(async (req, res, next) => {
    const { issueDescription, priority, device } = req.body;

    
    const existDevice = await DeviceModel.findById(device);
    if (!existDevice) return next(new AppError('Device not found', 404));

    const newRequest = await MaintReqModel.create({
        issueDescription,
        priority,
        device,
        createdBy: req.user   
    });

    return res.status(201).json({ msg: 'Request created successfully', Request: newRequest });
});

const getAllRequests = asyncHandler(async (req, res, next) => {
    const requests = await MaintReqModel.find()
        .populate('device', 'name serialNumber')
        .populate('createdBy', 'Fname Lname role')
        .sort({ createdAt: -1 });

    return res.status(200).json({ msg: 'Done', All_Requests: requests });
});

const getRequestById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const request = await MaintReqModel.findById(id)
        .populate('device', 'name serialNumber status')
        .populate('createdBy', 'Fname Lname role');

    if (!request) return next(new AppError('Request not found', 404));

    return res.status(200).json({ msg: 'Done', Request: request });
});

const updateRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status, issueDescription, priority } = req.body;

    const request = await MaintReqModel.findById(id);
    if (!request) return next(new AppError('Request not found', 404));

    const updated = await MaintReqModel.findByIdAndUpdate(
        id,
        { status, issueDescription, priority },
        { new: true }
    );

    return res.status(200).json({ msg: 'Updated successfully', Request: updated });
});

const deleteRequest = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const request = await MaintReqModel.findById(id);
    if (!request) return next(new AppError('Request not found', 404));

    await MaintReqModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Request deleted successfully' });
});

module.exports = {
    createRequest,
    getAllRequests,
    getRequestById,
    updateRequest,
    deleteRequest
};