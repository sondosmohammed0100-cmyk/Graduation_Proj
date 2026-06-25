const { asyncHandler } = require('../Utils/AsyncHandler');
const AppError = require('../Utils/AppError');
const WorkOrderModel = require('../Model/workOrder_Model');
const MaintReqModel = require('../Model/MaintenanceRequest_model');


const createWorkOrder = asyncHandler(async (req, res, next) => {
    const { maintenanceRequest, assignedTo, notes } = req.body;

  
    const request = await MaintReqModel.findById(maintenanceRequest);
    if (!request) return next(new AppError('Maintenance request not found', 404));


    const existing = await WorkOrderModel.findOne({ maintenanceRequest });
    if (existing) return next(new AppError('Work order already exists for this request', 409));

    const newWorkOrder = await WorkOrderModel.create({
        maintenanceRequest,
        assignedBy: req.user,   
        assignedTo,
        notes
    });

    await MaintReqModel.findByIdAndUpdate(maintenanceRequest, { status: 'In Progress' });

    return res.status(201).json({ msg: 'Work order created successfully', WorkOrder: newWorkOrder });
});


const getAllWorkOrders = asyncHandler(async (req, res, next) => {
    const workOrders = await WorkOrderModel.find()
        .populate({
            path: 'maintenanceRequest',
            populate: { path: 'device', select: 'name serialNumber' }
        })
        .populate('assignedBy', 'Fname Lname')
        .populate('assignedTo', 'Fname Lname')
        .sort({ createdAt: -1 });

    return res.status(200).json({ msg: 'Done', All_WorkOrders: workOrders });
});


const getWorkOrderById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const workOrder = await WorkOrderModel.findById(id)
        .populate({
            path: 'maintenanceRequest',
            populate: { path: 'device', select: 'name serialNumber status' }
        })
        .populate('assignedBy', 'Fname Lname role')
        .populate('assignedTo', 'Fname Lname role');

    if (!workOrder) return next(new AppError('Work order not found', 404));

    return res.status(200).json({ msg: 'Done', WorkOrder: workOrder });
});


const updateWorkOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { status, assignedTo, notes, completionDate } = req.body;

    const workOrder = await WorkOrderModel.findById(id);
    if (!workOrder) return next(new AppError('Work order not found', 404));

    const updated = await WorkOrderModel.findByIdAndUpdate(
        id,
        { status, assignedTo, notes, completionDate },
        { new: true }
    );


    if (status === 'Completed') {
        await MaintReqModel.findByIdAndUpdate(
            workOrder.maintenanceRequest,
            { status: 'Resolved' }
        );
    }

    return res.status(200).json({ msg: 'Updated successfully', WorkOrder: updated });
});


const deleteWorkOrder = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const workOrder = await WorkOrderModel.findById(id);
    if (!workOrder) return next(new AppError('Work order not found', 404));

    await WorkOrderModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: 'Work order deleted successfully' });
});

module.exports = {
    createWorkOrder,
    getAllWorkOrders,
    getWorkOrderById,
    updateWorkOrder,
    deleteWorkOrder
};