const crypto = require('crypto');

// You can load key from env or KMS
const KEY_PII = process.env.CRYPTO_PII_ACCESS_KEY;

const bcrypt = require('bcrypt');

function encrypt(text, key = KEY_PII) {
    const iv = crypto.randomBytes(16); // Initialization Vector
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

    return {
        iv: iv.toString('hex'),
        content: encrypted,
        tag,
    };
}

function decrypt(hash, key = KEY_PII) {
    const decipher = crypto.createDecipheriv(
        'aes-256-gcm',
        Buffer.from(key, 'hex'),
        Buffer.from(hash.iv, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(hash.tag, 'hex'));

    let decrypted = decipher.update(hash.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// SHA-256 hash (deterministic & searchable)
function cryptoHashing(data, pepper = process.env.CRYPTO_HASH_PEPPER || '') {
    if (data) {
        return crypto.createHash('sha256').update(data + pepper).digest('hex');
    }
    return data;
}


function bcryptHashing(text) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(text, 10, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

function bcryptCompare(text, hashedText) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(text, hashedText, (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
};

function safeDecrypt(value, key = KEY_PII) {
    if (value && typeof value === 'object' && value.iv) {
        return decrypt(value, key);
    }
    return value;
}

function safeEncrypt(value, key = KEY_PII) {
    if (value) {
        return encrypt(value, key);
    }
    return value;
}

function maskMobileNumber(encrypted) {
    const decrypted = safeDecrypt(encrypted);
    if (!decrypted || decrypted.length < 4) {
        return decrypted;
    }

    const last4 = decrypted.slice(-4);
    return last4.padStart(decrypted.length, '*');
}

const normalizeForSearch = (text) => {
  if (!text) {    
    return text;
  }
  return text
    ?.trim()
    ?.toLowerCase()
    ?.replace(/[^\w\s]/g, '') || undefined;
};

const removeSpace = (text) => {
  if (!text) {    
    return text;
  }
  return text
    ?.trim()
    ?.replace(/\s+/g, '') || undefined;
};

module.exports = { encrypt, decrypt, cryptoHashing, bcryptHashing, bcryptCompare, maskMobileNumber, safeDecrypt, safeEncrypt, normalizeForSearch, removeSpace };
