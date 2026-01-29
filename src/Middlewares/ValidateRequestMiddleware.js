const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  const lang = req.headers['x-language'] || 'english';
  if (!errors.isEmpty()) {
    const overAllErr = errors.array().map(value => value.msg[lang] || value.msg).join(',');
    errors.errors.map((val) => {
      val.msg = val.msg[lang] || val.msg;
      return val;
    });
    return res.status(400).send({ sts: 1, msg: overAllErr || 'Validation error', errors: errors.errors });
  }
  next();
};

module.exports = { validateRequest };
