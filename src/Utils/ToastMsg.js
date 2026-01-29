const e = require("cors");

const toastMsg = {
    mobileNumberRequired: {
        english: 'Mobile number is required',
        tamil: 'மொபைல் எண் அவசியம் தேவை',
    },
        mobileNumberEmpty: {
        english: 'Mobile number cannot be empty',
        tamil: 'மொபைல் எண் காலியாக இருக்கக்கூடாது',
    },
    validMobileNumberRequired: {
        english: 'Please enter a valid mobile number',
        tamil: 'தயவுசெய்து செல்லுபடியான மொபைல் எண்ணை உள்ளிடவும்',
    },
    fullNameNotEmpty: {
        english: 'Full name cannot be empty',
        tamil: 'முழு பெயர் காலியாக இருக்கக்கூடாது',
    },
    fullNameLettersOnly: {
        english: 'Full name can only contain letters, spaces, and dot',
        tamil: 'முழு பெயரில் எழுத்துகள், இடைவெளிகள் மற்றும் புள்ளி மட்டும் இருக்கலாம்',
    },
    addressIsRequired: {
        english: 'Address is required',
        tamil: 'முகவரி அவசியம் தேவை',
    },
    addressNotEmpty: {
        english: 'Address cannot be empty',
        tamil: 'முகவரி காலியாக இருக்கக்கூடாது',
    },
    dateOfBirthRequired: {
        english: 'Date of birth is required',
        tamil: 'பிறந்த தேதி அவசியம் தேவை',
    },
    dateOfBirthNotEmpty: {
        english: 'Date of birth cannot be empty',
        tamil: 'பிறந்த தேதி காலியாக இருக்கக்கூடாது',
    },
    dateOfBirthInvalid: {
        english: 'Please enter a valid date of birth (YYYY-MM-DD)',
        tamil: 'தயவுசெய்து செல்லுபடியான பிறந்த தேதியை உள்ளிடவும் (YYYY-MM-DD)',
    },
    genderRequired: {
        english: 'Gender is required',
        tamil: 'பாலினம் அவசியம் தேவை',
    },
    genderNotEmpty: {
        english: 'Gender cannot be empty',
        tamil: 'பாலினம் காலியாக இருக்கக்கூடாது',
    },
    genderInvalid: {
        english: 'Please select a valid gender',
        tamil: 'தயவுசெய்து செல்லுபடியான பாலினத்தை தேர்ந்தெடுக்கவும்',
    },
    aadharNumberRequired: {
        english: 'Aadhar number is required',
        tamil: 'ஆதார் எண் அவசியம் தேவை',
    },
    aadharNumberNotEmpty: {
        english: 'Aadhar number cannot be empty',
        tamil: 'ஆதார் எண் காலியாக இருக்கக்கூடாது',
    },
    aadharNumberInvalid: {
        english: 'Please enter a valid 12-digit Aadhar number',
        tamil: 'தயவுசெய்து செல்லுபடியான 12 இலக்க ஆதார் எண்ணை உள்ளிடவும்',
    },
    panNumberRequired: {
        english: 'PAN number is required',
        tamil: 'பான் எண் அவசியம் தேவை',
    },
    panNumberNotEmpty: {
        english: 'PAN number cannot be empty',
        tamil: 'பான் எண் காலியாக இருக்கக்கூடாது',
    },
    panNumberInvalid: {
        english: 'Please enter a valid PAN number',
        tamil: 'தயவுசெய்து செல்லுபடியான பான் எண்ணை உள்ளிடவும்',
    },
    invalidCharacter: {
        english: 'Invalid character entered',
        tamil: 'செல்லுபடியான எழுத்து அல்ல',
    },
    invalidScript: {
        english: 'Invalid script detected',
        tamil: 'செல்லுபடியான எழுத்துமுறை அல்ல',
    },
    onlyImagAllowed: {
        english: 'Only image files are allowed',
        tamil: 'பட கோப்புகள் மட்டுமே அனுமதிக்கப்படுகின்றன',
    },
    originalNameNotEmpty: {
        english: 'Original name cannot be empty',
        tamil: 'மூல பெயர் காலியாக இருக்கக்கூடாது',
    },
    mimeTypeNotEmpty: {
        english: 'MIME type cannot be empty',
        tamil: 'MIME வகை காலியாக இருக்கக்கூடாது',
    },
    sizeNotEmpty: {
        english: 'Size cannot be empty',
        tamil: 'அளவு காலியாக இருக்கக்கூடாது',
    },
    pathNotEmpty: {
        english: 'Path cannot be empty',
        tamil: 'பாதை காலியாக இருக்கக்கூடாது',
    }
};

module.exports = { toastMsg };
