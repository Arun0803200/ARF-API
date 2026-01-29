const crypto = require('crypto');
console.log(crypto.randomBytes(64).toString('base64')); // Access & Refresh Token
console.log(crypto.randomBytes(32).toString('hex')); // Encryption, Decryption and Crypto Hash
const { v4: uuidv4 } = require('uuid');

const newUuid = uuidv4();
console.log('uuid:', newUuid);
