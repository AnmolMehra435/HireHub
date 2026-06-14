import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "resumes",
        resource_type: "raw"
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/pdf"){
        cb(null, true);
    }else{
        cb(new Error("Only pdf's allowed"));
    }
}

export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize: 5 * 1024 * 1024
    }
})