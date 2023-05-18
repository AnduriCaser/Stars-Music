const hash = require("hash.js");


const hashPassword = (password) => {
    return hash.sha256().update(password).digest('hex');
};

const hashCompare = (first, second) => {
    return Object.is(first, second);
};

module.exports = {
    hashPassword,
    hashCompare
}