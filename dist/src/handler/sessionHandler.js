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
const session = require("koa-session");
const session_1 = require("../db/session");
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDd+iJ/nJL0ALEnRT6sYHaV/IRu
hJVlbV0zLvOXmv31IWa1fWJEOHao9qXfLMsdECLeTSl1yRjf5S5NBH4eIXl4yhAq
/P3/kICLrtU1cjEdaE34xikIzh5ru+1UOU9DYCjYc1PiAlX7cLyy+8qbC6NVA8cY
vNNTprgLu3dLKFYyQQIDAQAB
-----END PUBLIC KEY-----
`;
const setSession = (app) => {
    app.keys = [publicKey];
    app.use(session(CONFIG, app));
};
const CONFIG = {
    key: 'wyx',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
    secure: false,
    sameSite: null,
    store: {
        get: (key) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b;
            const res = yield session_1.default.find({
                key
            });
            const value = (_b = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : null;
            return value;
        }),
        set: (key, value, maxAge) => __awaiter(void 0, void 0, void 0, function* () {
            const newSession = new session_1.default({ key, value });
            yield newSession.save();
        }),
        destroy: (key) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('destory');
            yield session_1.default.findOneAndRemove({
                key
            });
        })
    }
};
exports.default = setSession;
