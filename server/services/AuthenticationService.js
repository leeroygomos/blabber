const bcrypt = require('bcrypt');
const saltRounds = 10; // number of hashing rounds

async function hashPassword(password) {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

async function validateUser(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    hashPassword,
    validateUser
}