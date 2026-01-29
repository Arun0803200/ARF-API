const express = require('express');
const UserController = require('../Core/Api/UserController/UserController');
const ImageController = require('../Core/Api/CommonController/ImageController');
const { validateRequest } = require('../Middlewares/ValidateRequestMiddleware');
    
const router = express.Router();
const { userValidations } = require('../Validators/UserValidators');

// Upload Multer
const upload = require('../Utils/Multer')

router.post('/upload-file', upload.single('profileImage'), ImageController.upload);
router.get('/images/:fileName', ImageController.getImage)
router.delete('/images/:fileName', ImageController.deleteImage)

router.post('/register', userValidations, validateRequest, UserController.registerUser);
router.get('/:id', (req, res) => UserController.getUser(req, res));

module.exports = { router };
