const imageService = require("../../Services/ImageService");

class UploadController {

  /**
   * @api {post} /api/v1/user/upload-file Upload Profile Image
   * @apiName UploadProfileImage
   * @apiGroup Image
   *
   * @apiDescription
   * Uploads a single profile image to local storage using multipart/form-data.
   * The image is saved with a dynamically generated filename.
   * Only image files are allowed.
   *
   * @apiHeader {String} Content-Type multipart/form-data
   *
   * @apiBody {File} profileImage Profile image file (required, image only, max 2MB)
   *
   * @apiSuccess (201) {Boolean} success Indicates upload status
   * @apiSuccess (201) {String} message Success message
   * @apiSuccess (201) {Object} data Uploaded image info
   * @apiSuccess (201) {String} data.fileName Generated file name
   * @apiSuccess (201) {String} data.path Relative file path
   *
   * @apiError (400) {Boolean} success false
   * @apiError (400) {String} message Error message (invalid file / missing file)
   *
   * @apiSampleRequest /api/v1/user/upload-file
   *
   * @apiExample {json} Success-Response:
   * {
   *   "success": true,
   *   "message": "Image uploaded successfully",
   *   "data": {
   *     "fileName": "1706602332123-123456789.png",
   *     "path": "/uploads/images/1706602332123-123456789.png"
   *   }
   * }
   */

  upload(req, res, next) {
    try {
      console.log('enterrrrrr');

      const result = imageService.uploadImage(req.file);

      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @api {get} /api/v1/user/images/:fileName Get Image by File Name
   * @apiName GetImageByFileName
   * @apiGroup Image
   *
   * @apiDescription
   * Fetches an uploaded image from local storage using the provided file name.
   * Returns the image file directly if it exists.
   *
   * @apiParam {String} fileName Uploaded image file name
   *
   * @apiSuccess (200) {File} image Image file stream (jpg/jpeg/png/webp)
   *
   * @apiError (404) {Boolean} success false
   * @apiError (404) {String} message Image not found
   *
   * @apiSampleRequest /api/v1/user/images/1706602332123-123456789.png
   *
   * @apiExample {json} Error-Response:
   * {
   *   "success": false,
   *   "message": "Image not found"
   * }
   */

  getImage(req, res) {
    try {
      const { fileName } = req.params;

      const imagePath = imageService.getImage(fileName);

      res.sendFile(imagePath);
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }

  /**
   * @api {delete} /api/v1/user/images/:fileName Delete Image
   * @apiName DeleteImage
   * @apiGroup Image
   *
   * @apiDescription
   * Deletes an uploaded image from local storage using the provided file name.
   * Returns success message if deletion is completed.
   *
   * @apiParam {String} fileName Uploaded image file name
   *
   * @apiSuccess (200) {Boolean} success Indicates deletion status
   * @apiSuccess (200) {String} message Success message
   *
   * @apiError (404) {Boolean} success false
   * @apiError (404) {String} message Image not found
   *
   * @apiSampleRequest /api/v1/user/images/1706602332123-123456789.png
   *
   * @apiExample {json} Success-Response:
   * {
   *   "success": true,
   *   "message": "Image deleted successfully"
   * }
   *
   * @apiExample {json} Error-Response:
   * {
   *   "success": false,
   *   "message": "Image not found"
   * }
   */

  deleteImage(req, res) {
    try {
      const { fileName } = req.params;

      imageService.deleteImage(fileName);

      res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  }
}

module.exports = new UploadController();
