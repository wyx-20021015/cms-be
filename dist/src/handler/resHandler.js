"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resHandler = (ctx, next) => {
    const data = ctx.body || null;
    const msg = ctx.msg || null;
    if (data === null && msg === null) {
        ctx.status = 404;
        ctx.success = false;
    }
    const success = ctx.success === undefined ? true : ctx.success;
    if (success === true)
        ctx.status = 200;
    const res = { msg, data, success };
    ctx.body = res;
};
exports.default = resHandler;
