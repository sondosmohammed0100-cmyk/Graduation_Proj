const multer =require('multer');

const AppError = require('../Utils/AppError')


/***********Custome Validation for types***************/
const allowedType = {
    Image: ['image/png', 'image/jpg', 'image/jpeg'],
    Files: ['application/pdf'],
    Videos: ['video/mp4']
};

/****************Multer middelware**********************/
const multerCloud = (allowedType) => {

    const storage = multer.diskStorage({});

    const fileFilter = function (req, file, cb) {

        if (allowedType.includes(file.mimetype)) {
            return cb(null, true)
        }
        return cb(new AppError("Invalid extention", 400), false)
    }
    const fileUpload = multer({ fileFilter, storage });
    return fileUpload;

}
module.exports = {multerCloud,allowedType};
