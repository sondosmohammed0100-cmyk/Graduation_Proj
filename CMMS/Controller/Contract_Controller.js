const { asyncHandler } = require('../Utils/AsyncHandler');
const AppError = require('../Utils/AppError');
const ContractModel = require('../Model/CompanyContract_Model');

const AddingContract = asyncHandler(
    async (req, res, next) => {
        if (!req.body) {
            return next(new AppError('Body is Empty', 400));

        }
        const { nameCompany, startDate, endDate, companyPhone } = req.body;
        const Contract = await ContractModel.findOne({ nameCompany });
        if (Contract) {
            return next(new AppError('Company already exist', 409));
        };
        const newContract = await ContractModel.create({
            nameCompany,
            startDate,
            endDate,
            companyPhone
        });
        return res.status(201).json({
            msg: "Contract added sucessfully",
            ContractDetails: newContract
        })
    }
);

const getContract = asyncHandler(
    async (req, res, next) => {
        const Contracts = await ContractModel.find().select('-__v');
        res.status(200).json({ msg: 'Done', All_Contracts: Contracts })

    }
);
module.exports={AddingContract,getContract}
