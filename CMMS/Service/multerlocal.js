const multer =require('multer');
const path = require('path')
const AppError = require('../Utils/AppError')
const fs=require('fs')

/***********Custome Validation for types***************/
const allowedType = {
    Image: ['image/png', 'image/jpg', 'image/jpeg'],
    Files: ['application/pdf'],
    Videos: ['video/mp4']
};

/****************Multer middelware**********************/
const fileHandling = (allowedType,custompath) => {

    const destPath= path.resolve(`Uploads/${custompath}`);
    if(!fs.existsSync(destPath)){
        fs.mkdirSync(destPath, { recursive: true })
    }
    if(!custompath){
        custompath='General'
    }

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destPath)

        },
        filename: function (req, file, cb) {
            const fileName = Date.now() + path.extname(file.originalname);
            cb(null, fileName);

        }

    });
    const fileFilter = function (req, file, cb) {

        if (allowedType.includes(file.mimetype)) {
            return cb(null, true)
        }
        return cb(new AppError("Invalid extention", 400), false)
    }
    const fileUpload = multer({ fileFilter, storage });
    return fileUpload;

}
module.exports = {fileHandling,allowedType};
