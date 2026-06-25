const { asyncHandler } = require('../Utils/AsyncHandler');
const AppError = require('../Utils/AppError');
const MaintenanceModel = require('../Model/Maintenance_Model');
const WorkOrderModel = require('../Model/workOrder_Model');
const DeviceModel = require('../Model/Devices_Model');


const createMaintenance = asyncHandler(async (req, res, next) => {
    const { type, maintenanceDate, status, notes, device, workOrder } = req.body;


    const existDevice = await DeviceModel.findById(device);
    if (!existDevice) return next(new AppError('Device not found', 404));

    const existWorkOrder = await WorkOrderModel.findById(workOrder);
    if (!existWorkOrder) return next(new AppError('Work order not found', 404));

    const newMaintenance = await MaintenanceModel.create({
        type,
        maintenanceDate,
        status,
        notes,
        device,
        workOrder
    });


    if (status === 'Completed') {
        await DeviceModel.findByIdAndUpdate(device, { status: 'Working' });
        await WorkOrderModel.findByIdAndUpdate(workOrder, {
            status: 'Completed',
            completionDate: new Date()
        });
    }

    return res.status(201).json({ msg: 'Maintenance record created successfully', Maintenance: newMaintenance });
});

const getAllMaintenance = asyncHandler(async (req, res, next) => {
    const records = await MaintenanceModel.find()
        .populate('device', 'name serialNumber status')
        .populate({
            path: 'workOrder',
            populate: [
                { path: 'assignedBy', select: 'Fname Lname' },
                { path: 'assignedTo', select: 'Fname Lname' }
            ]
        })
        .sort({ createdAt: -1 });

    return res.status(200).json({ msg: 'Done', All_Maintenance: records });
});


const getMaintenanceById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const record = await MaintenanceModel.findById(id)
        .populate('device', 'name serialNumber manufacturer status')
        .populate({
            path: 'workOrder',
            populate: [
                { path: 'assignedBy', select: 'Fname Lname role' },
                { path: 'assignedTo', select: 'Fname Lname role' },
                {
                    path: 'maintenanceRequest',
                    populate: { path: 'createdBy', select: 'Fname Lname role' }
                }
            ]
        });

    if (!record) return next(new AppError('Maintenance record not found', 404));

    return res.status(200).json({ msg: 'Done', Maintenance: record });
});


const updateMaintenance = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { type, maintenanceDate, status, notes } = req.body;

    const record = await MaintenanceModel.findById(id);
    if (!record) return next(new AppError('Maintenance record not found', 404));

    const updated = await MaintenanceModel.findByIdAndUpdate(
        id,
        { type, maintenanceDate, status, notes },
        { new: true }
    );


    if (status === 'Completed') {
        await DeviceModel.findByIdAndUpdate(record.device, { status: 'Working' });
        await WorkOrderModel.findByIdAndUpdate(record.workOrder, {
            status: 'Completed',
            completionDate: new Date()
        });
    }

    return res.status(200).json({ msg: 'Updated successfully', Maintenance: updated });
});


const deleteMaintenance = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const record = await MaintenanceModel.findById(id);
    if (!record) return next(new AppError('Maintenance record not found', 404));

    await MaintenanceModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Maintenance record deleted successfully' });
});

module.exports = {
    createMaintenance,
    getAllMaintenance,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
};