const { asyncHandler } = require('../Utils/AsyncHandler');
const AppError = require('../Utils/AppError');
const DepartmentModel = require('../Model/Department_Model');

const AddingDepartment = asyncHandler(
    async (req, res, next) => {
        if (!req.body) {
            return next(new AppError('Body is Empty', 400));

        }
        const { name, location } = req.body;
        const Department = await DepartmentModel.findOne({ name });
        if (Department) {
            return next(new AppError('Department already exist', 409));
        };
        const newDepartment = await DepartmentModel.create({
            name,
            location
        });
        return res.status(201).json({
            msg: "Department added sucessfully",
            Department: newDepartment
        })
    }
);

const getDepartment = asyncHandler(
    async (req, res, next) => {
        const Departments = await DepartmentModel.find();
        res.status(200).json({ msg: 'Done', All_Department: Departments })

    }
);
module.exports = { AddingDepartment, getDepartment };
