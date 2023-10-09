const crypto = require('crypto');
const randomCode = (length) => {
    const buffer = crypto.randomBytes(Math.ceil(length / 2));
    const code = buffer.toString('hex').slice(0, length);
    return code;
};
module.exports = randomCode;
