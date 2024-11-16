const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const keyTokenHash = process.env.KEY_TOKEN_HASH;
const jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = class {
    randomstring(length) {
        return CryptoJS.lib.WordArray.random(length).toString();
    }

    hash(data) {
        return CryptoJS.HmacSHA256(data, keyTokenHash).toString();
    }

    signJwt(payload) {
        return jwt.sign(payload, jwtSecretKey, {
            expiresIn: '24h'
        });
    }

    verifyJwt(token) {
        try {
            return jwt.verify(token, jwtSecretKey);
        } catch (error) {
            return undefined;
        }
    }
};