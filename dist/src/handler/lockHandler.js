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
exports.judgeLock = exports.lock = void 0;
class Lock {
    constructor(lock) {
        this.lock = lock;
    }
    p() {
        this.lock = false;
    }
    v() {
        this.lock = true;
    }
    getStatus() {
        return this.lock;
    }
}
const lock = new Lock(true);
exports.lock = lock;
const judgeLock = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (lock.getStatus() === false) {
        ctx.status = 500;
        throw new Error('服务器错误');
    }
    yield next();
});
exports.judgeLock = judgeLock;
