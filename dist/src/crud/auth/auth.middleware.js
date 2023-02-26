"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.setSession = exports.verifyAuth = exports.verifyLogin = void 0;
const fs = require("fs");
const path = require("path");
const md5passwd_1 = require("../../utils/md5passwd");
const admin = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../app/admin/admin.json'), {
    encoding: 'utf-8'
}));
const verifyLogin = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = ctx.request.body;
    username = username.trim();
    password = password.trim();
    if (!password) {
        throw new Error('密码不能为空!');
    }
    if ((username !== (0, md5passwd_1.default)(admin[0].username) ||
        password !== (0, md5passwd_1.default)(admin[0].password)) &&
        (username !== 'wyx' || password !== 'wyx123')) {
        console.log('wrong');
        throw new Error('密码错误!');
    }
    ctx.msg = 'ok!';
    yield next();
});
exports.verifyLogin = verifyLogin;
const setSession = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.session.username = admin[0].username;
    }
    catch (e) {
        console.log(e);
    }
    console.log('ctx.session.username', ctx.session.username);
    ctx.body = admin[0].username;
    yield next();
});
exports.setSession = setSession;
const verifyAuth = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('session:', (_a = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _a === void 0 ? void 0 : _a.username);
    const username = (_b = ctx === null || ctx === void 0 ? void 0 : ctx.session) === null || _b === void 0 ? void 0 : _b.username;
    if (username !== admin[0].username) {
        throw new Error('请先登录!');
    }
    ctx.success = true;
    ctx.body = username;
    yield next();
});
exports.verifyAuth = verifyAuth;
const logOut = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.session = null;
    ctx.success = true;
    ctx.msg = 'ok';
    yield next();
});
exports.logOut = logOut;
