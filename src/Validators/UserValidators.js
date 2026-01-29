const { body } = require('express-validator');
const { toastMsg } = require('../Utils/ToastMsg');
const { gender } = require('../Utils/Settings');
const mobileNumberValidation = [
    body('mobileNumber')
        .trim()
        .exists().withMessage(toastMsg.mobileNumberRequired)
        .notEmpty().withMessage(toastMsg.mobileNumberEmpty)
        .matches(/^[6-9]\d{9}$/)
        .withMessage(toastMsg.validMobileNumberRequired),
];

const fullNameValidation = [
    body('fullName')
        .notEmpty().withMessage(toastMsg.fullNameNotEmpty)
        .matches(/^[\p{L}\p{M}\s.]+$/u) // Allows letters, marks, spaces, and dot
        .withMessage(toastMsg.fullNameLettersOnly),
];

const userValidations = [
    ...mobileNumberValidation,
    ...fullNameValidation,
    body('address')
        .optional()
        .notEmpty().withMessage(toastMsg.addressNotEmpty),
    body('dob')
        .optional()
        .notEmpty().withMessage(toastMsg.dateOfBirthNotEmpty)
        .isDate({ format: 'YYYY-MM-DD' }).withMessage(toastMsg.dateOfBirthInvalid),
    body('gender')
        .optional()
        .notEmpty().withMessage(toastMsg.genderNotEmpty)
        .isIn(Object.values(gender)).withMessage(toastMsg.genderInvalid),
    body('aadharNumber')
        .optional()
        .notEmpty().withMessage(toastMsg.aadharNumberNotEmpty)
        .matches(/^\d{12}$/).withMessage(toastMsg.aadharNumberInvalid),
    body('panNumber')
        .optional()
        .notEmpty().withMessage(toastMsg.panNumberNotEmpty)
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).withMessage(toastMsg.panNumberInvalid),
    body('originalName')
        .notEmpty().withMessage(toastMsg.originalNameNotEmpty),
    body('mimeType')
        .notEmpty().withMessage(toastMsg.mimeTypeNotEmpty),
    body('size')
        .notEmpty().withMessage(toastMsg.sizeNotEmpty),
    body('path')
        .notEmpty().withMessage(toastMsg.pathNotEmpty),
];

module.exports = { userValidations };
