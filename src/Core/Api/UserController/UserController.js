const { UserService } = require('../../Services/UserService');
const userService = new UserService();

class UserController {
  // POST /users/register
  /**
 * @api {post} /users/register Register a New User
 * @apiName RegisterUser
 * @apiGroup User
 *
 * @apiBody {String} name User's full name
 * @apiBody {String} email User's email address
 * @apiBody {String} mobile_number User's mobile number
 * @apiBody {String} password User's password
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Registered user data
 * @apiSuccess {Number} data.id User ID
 * @apiSuccess {String} data.name User name
 * @apiSuccess {String} data.email User email
 * @apiSuccess {String} data.mobile_number User mobile number
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    "success": true,
 *    "message": "User registered successfully",
 *    "data": {
 *      "id": 1,
 *      "name": "John Doe",
 *      "email": "john@example.com",
 *      "mobile_number": "9999999999"
 *    }
 *  }
 *
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 500 Internal Server Error
 *  {
 *    "success": false,
 *    "message": "Internal server error",
 *    "error": "Some error message"
 *  }
 */

  async registerUser(req, res) {
    try {
      const userData = req.body;

      const newUser = await userService.registerUser(userData);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: newUser,
      });

    } catch (error) {
      console.error('Register User Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }

  // GET /users/:id
  async getUser(req, res) {
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
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}

module.exports = new UserController();
