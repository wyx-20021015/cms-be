"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function md5password(password) {
    const md5 = crypto.createHash('md5');
    const res = md5.update(password).digest('hex');
    return res;
}
exports.default = md5password;
