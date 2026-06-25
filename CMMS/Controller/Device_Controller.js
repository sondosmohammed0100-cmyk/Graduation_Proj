const { asyncHandler } = require('../Utils/AsyncHandler');
const AppError = require('../Utils/AppError');
const DeviceModel = require('../Model/Devices_Model');
const DepartmentModel = require('../Model/Department_Model');
const ContractModel = require('../Model/CompanyContract_Model')

const AddingDevice = asyncHandler(

    async (req, res, next) => {

        if (!req.body) {
            return next(new AppError('Body is Empty', 400));

        }

        const { name,
            serialNumber,
            manufacturer,
            supplier,
            status,
            priority,
            purchaseDate,
            department,
            maintContract
        } = req.body;


        const Find_department = await DepartmentModel.findOne({ name: department });
        //   console.log(department)

        if (!Find_department) {
            return next(new AppError('Department not found', 404));
        }

        const Find_contract = await ContractModel.findOne({ nameCompany: maintContract });
        if (!Find_contract) {
            return next(new AppError('Contract not found', 404));
        }

        //return console.log(maintContract)

        const existDevice = await DeviceModel.findOne({ serialNumber, name });
        if (existDevice) {
            return next(new AppError('Device already exist', 409));
        }

        const newDevice = await DeviceModel.create({
            name,
            serialNumber,
            manufacturer,
            supplier,
            status,
            priority,
            purchaseDate,
            department: Find_department._id,
            maintContract: Find_contract._id
        });

        return res.status(201).json({
            msg: "Device added successfully",
            Device: newDevice
        });
    });

const getDevice = asyncHandler(
    async (req, res, next) => {
        const Devices = await DeviceModel.find()
            .populate("department", "name")
            .populate("maintContract", "nameCompany");
        res.status(200).json({ msg: 'Done', All_Devices: Devices });
    });

const getDeviceById = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const device = await DeviceModel.findById(id);
        if (!device)
            return next(new AppError('Device not found', 404))


        return res.status(200).json({ msg: 'Done', Device: device })
    }
);

const updateDevice = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const device = await DeviceModel.findById(id);
        if (!device)
            return next(new AppError('Device not found', 404));

        const { name,
            serialNumber,
            manufacturer,
            supplier,
            status,
            priority,
            purchaseDate,
            department,
            maintContract } = req.body;

        const Find_department = await DepartmentModel.findOne({ name: department });


        if (!Find_department) {
            return next(new AppError('Department not found', 404));
        }
        const Find_contract = await ContractModel.findOne({ nameCompany: maintContract });
        if (!Find_contract) {
            return next(new AppError('Contract not found', 404));
        }



        const updated_device = await DeviceModel.findByIdAndUpdate(id,
            {
                name,
                serialNumber,
                manufacturer,
                supplier,
                status,
                priority,
                purchaseDate,
                department: Find_department._id,
                maintContract: Find_contract._id
            },
            { new: true }
        );
        return res.status(200).json({ msg: "Updated Sucessfully", updated_device });
    }
);

const delete_Device = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const device = await DeviceModel.findById(id);
        if (!device)
            return next(new AppError('Device not found', 404));

        const deviceDeleted = await DeviceModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Device deleted sucessfully" });

    }
);

module.exports = {
    AddingDevice,
    getDevice,
    getDeviceById,
    updateDevice,
    delete_Device
};


