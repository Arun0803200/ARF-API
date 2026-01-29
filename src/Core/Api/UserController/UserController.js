const { UserService } = require('../../Services/UserService');
const { safeEncrypt, cryptoHashing, normalizeForSearch } = require('../../../Utils/CryptoJS');
const { ActivityLogService } = require('../../Services/ActivityLogService');
const { userRoles } = require('../../../Utils/Settings');

const userService = new UserService();
const activityLogService = new ActivityLogService();

class UserController {
  // POST /users/register
  /**
   * @api {post} /api/v1/user/register Register a new user
   * @apiName RegisterUser
   * @apiGroup User
   *
   * @apiDescription
   * Registers a new user with the provided details. Mandatory fields are strictly required.
   * Optional fields are validated only if provided.
   *
   * @apiBody {String} mobileNumber User's mobile number (required, must match /^[6-9]\d{9}$/)
   * @apiBody {String} fullName User's full name (required)
   *
   * @apiBody {String} [address] User's address (optional, must not be empty if provided)
   *
   * @apiBody {String} [dob] User's date of birth (optional, format: YYYY-MM-DD)
   *
   * @apiBody {String="male","female","others"} [gender] User's gender (optional, must be one of allowed values)
   *
   * @apiBody {String{12}} [aadharNumber] User's 12-digit Aadhar number (optional, must match /^\d{12}$/)
   *
   * @apiBody {File} [profileImage] User profile image (optional, jpg/png/jpeg)
   *
   * @apiBody {String} [panNumber] User's PAN number (optional, must match /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
   *
   * @apiBody {String} originalName Profile image original file name, must not be empty
   * @apiBody {String} mimeType Profile image MIME type, must not be empty
   * @apiBody {Number} size Profile image file size in bytes, must not be empty
   * @apiBody {String} path Profile image file path, must not be empty
   * 
   * @apiSuccess (201) {Boolean} success Indicates if the registration was successful
   * @apiSuccess (201) {String} message Success message
   * @apiSuccess (201) {Object} data Registered user data
   *
   * @apiError (400) {Object} ValidationError Validation failed for one or more fields
   * @apiError (500) {Object} InternalServerError Unexpected server error
   *
   * @apiSampleRequest /api/v1/user/register
   *
   * @apiExample {json} Request-Example:
   * {
   *   "mobileNumber": "9876543210",
   *   "fullName": "Arun Prakash",
   *   "address": "123, Main Street, Chennai",
   *   "dob": "1990-05-15",
   *   "gender": "male",
   *   "aadharNumber": "123456789012",
   *   "panNumber": "ABCDE1234F"
   * }
   */

  async registerUser(req, res, next) {
    try {
      const {
        mobileNumber,
        fullName,
        address,
        dob,
        gender,
        aadharNumber,
        panNumber,
        originalName,
        mimeType,
        size,
        path,
      } = req.body;

      const newUser = await userService.registerUser({
        mobileNumber: safeEncrypt(mobileNumber),
        mobileNumberForSearch: cryptoHashing(mobileNumber),
        fullName: safeEncrypt(fullName),
        fullNameForSearch: normalizeForSearch(fullName),
        address: safeEncrypt(address),
        dob: safeEncrypt(dob),
        gender,
        aadharNumber: safeEncrypt(aadharNumber),
        aadharNumberForSearch: cryptoHashing(aadharNumber),
        panNumber: safeEncrypt(panNumber),
        panNumberForSearch: cryptoHashing(panNumber),
        role: userRoles.user,
        profileImageUrl: path,
        profileImageOriginalName: originalName,
        profileImageMimeType: mimeType,
        profileImageSize: size,
      });

      const responseData = {
        success: 1,
        message: 'User registered successfully',
      };

      // Activity Log
      activityLogService.create({
        userId: newUser.id,
        tblName: 'tbl_users',
        refId: newUser.id,
        action: 'created',
        requestData: req.body,
        responseData: responseData,
      });

      return res.status(201).json(responseData);

    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  // GET /users/:id
  async getUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await userService.getUser(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });

    } catch (error) {
      console.error('Get User Error:', error);
      next(error);
    }
  }
}

module.exports = new UserController();
