const crypto = require('crypto');
const key = crypto.randomBytes(32).toString('hex').toUpperCase();
console.log(`🥷🏻✶ | file: secretKeyGenerator.js | line 3 | key`, key);
