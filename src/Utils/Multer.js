const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { toastMsg } = require("./ToastMsg");

const uploadPath = path.join(process.cwd(), "src/Uploads/Profile");
const UPLOAD_IMG_MB_SIZE = process.env.UPLOAD_IMG_MB_SIZE || 2;

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        // Dynamic file name
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    console.log(req.method, 'kkkkkkk');
    
    if (!file.mimetype.startsWith("image/")) {
        return cb(
            new Error(toastMsg.onlyImagAllowed[req.headers['x-language'] || 'english']),
            false
        );
    }

    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: UPLOAD_IMG_MB_SIZE * 1024 * 1024, // 2MB
    },
});

module.exports = upload;
