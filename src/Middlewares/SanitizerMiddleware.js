// sanitize.middleware.js
const { toastMsg } = require('../Utils/ToastMsg');
const sanitizeMiddleware = function sanitizeMiddleware(req, res, next) {
  const lang = req.headers['x-language'] || 'english';

  const skipKeys = new Set([
    'password',
    'startTime',
    'mimeType',
    'path'
  ]);

  const invalidCharRegex = /[<>#%'"$^&*{}()[\]|\\/=;?`~]/;
  const linkOrScriptRegex = /(https?:\/\/|ftp:\/\/|file:\/\/|data:|<script|onerror=|onload=|\.com|\.net|\.in)/i;

  // Recursive sanitizer
  const sanitize = (obj, sourceName, path = '') => {
    if (!obj) return;

    for (const [key, val] of Object.entries(obj)) {
      if (val === undefined || val === null || skipKeys.has(key)) continue;

      const currentPath = path ? `${path}.${key}` : `${sourceName}.${key}`;

      if (typeof val === 'string') {
        const str = val.trim();
        if (!str) continue;

        if (invalidCharRegex.test(str)) {
          return res.status(400).json({
            sts: 1,
            msg: `${toastMsg.invalidCharacter[lang]} ${currentPath}`,
          });
        }

        if (linkOrScriptRegex.test(str)) {
          return res.status(400).json({
            sts: 1,
            msg: `${toastMsg.invalidScript[lang]} ${currentPath}`,
          });
        }
      } else if (Array.isArray(val)) {
        // Recursively sanitize each item in the array
        for (let i = 0; i < val.length; i++) {
          const item = val[i];
          if (typeof item === 'object') {
            sanitize(item, sourceName, `${currentPath}[${i}]`);
          } else {
            sanitize({ temp: item }, sourceName, `${currentPath}[${i}]`);
          }
        }
      } else if (typeof val === 'object') {
        // Recursively sanitize nested objects
        sanitize(val, sourceName, currentPath);
      }
    }
  };

  sanitize(req.body, 'body');
  sanitize(req.query, 'query');
  sanitize(req.params, 'params');

  next();
};

module.exports = { sanitizeMiddleware };
