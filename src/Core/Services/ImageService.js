const fs = require("fs");
const path = require("path");

class ImageService {
    constructor() {
        this.basePath = path.join(process.cwd(), "src/Uploads/Profile");
    }

    // Save image (already stored by multer)
    uploadImage(file) {
        if (!file) throw new Error("No file provided");

        return {
            fileName: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: `/Uploads/Profile/${file.filename}`,
        };
    }

    // Get image full path
    getImage(fileName) {
        const filePath = path.join(this.basePath, fileName);

        if (!fs.existsSync(filePath)) {
            throw new Error("Image not found");
        }

        return filePath;
    }

    // Delete image
    deleteImage(fileName) {
        const filePath = path.join(this.basePath, fileName);

        if (!fs.existsSync(filePath)) {
            throw new Error("File not found");
        }

        fs.unlinkSync(filePath);

        return true;
    }
}

module.exports = new ImageService();
