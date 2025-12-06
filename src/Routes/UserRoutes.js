const express = require('express');
const UserController = require('../Core/Api/UserController/UserController');

const router = express.Router();

router.post('/register', (req, res) => UserController.registerUser(req, res));
router.get('/:id', (req, res) => UserController.getUser(req, res));

module.exports = {router};
