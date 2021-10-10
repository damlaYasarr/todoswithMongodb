const multer= require("multer");
const path=require("path");
const CustomError = require("../error/customError");

const imageStorage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '.' + file.mimetype.split('/')[1])
    }
})

const photoUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000 //1mb
    },
    fileFilter(req, file, cb) {
        cb(undefined, true)
    }
})
 module.exports={photoUpload};