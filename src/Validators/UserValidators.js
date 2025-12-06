const { body, param, query } = require('express-validator');
const { toastMsg } = require('../Utils/ToastMsg');
const mobileNumberValidation = [
    body('mobileNumber')
        .trim()
        .exists().withMessage(toastMsg.mobileNumberRequired)
        .notEmpty().withMessage(toastMsg.mobileNumberEmpty)
        .matches(/^[6-9]\d{9}$/)
        .withMessage(toastMsg.validMobileNumberRequired),
];

module.exports = {};
