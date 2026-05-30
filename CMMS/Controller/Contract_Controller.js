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

const getContractById = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const contract = await ContractModel.findById(id);
        if (!contract)
            return next(new AppError('Contract not found', 404))


        return res.status(200).json({ msg: 'Done', Contract: contract })
    }
);
const updateContract = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const contract = await ContractModel.findById(id);
        if (!contract)
            return next(new AppError('Contract not found', 404));

        const {
            nameCompany,
            startDate,
            endDate,
            companyPhone } = req.body;

        const updated_contract = await ContractModel.findByIdAndUpdate(id,
            {
                nameCompany,
                startDate,
                endDate,
                companyPhone
            },
            { new: true }
        );
        return res.status(200).json({ msg: "Updated Sucessfully", updated_contract });
    }
);
const delete_Contract = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const contract = await ContractModel.findById(id);
        if (!contract)
            return next(new AppError('Contract not found', 404));

        const ContractDeleted = await ContractModel.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Contract deleted sucessfully" });

    }
)

module.exports = {
    AddingContract,
    getContract,
    delete_Contract,
    updateContract,
    getContractById
}
