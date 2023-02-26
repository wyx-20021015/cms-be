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
exports.getStuById = exports.searchStu = exports.getStuByOffset = exports.createStu = exports.updateStu = exports.deleteStu = void 0;
const stu_service_1 = require("./stu.service");
const upload_middleware_1 = require("../upload/upload.middleware");
const createStu = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const req = ctx.request.body;
    req.name = req.name.trim();
    try {
        yield stu_service_1.default.createStu(req);
    }
    catch (e) {
        throw new Error('参数格式错误!');
    }
    yield next();
});
exports.createStu = createStu;
const deleteStu = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    const res = yield stu_service_1.default.deleteStu(id);
    if (res === null) {
        ctx.success = false;
        ctx.msg = '找不到该用户，可能已经删除';
    }
    else {
        try {
            (0, upload_middleware_1.doDelete)(`avatar/${res.avatar}`);
        }
        catch (e) {
            ctx.msg = '删除用户成功，但是删除图片失败了.';
        }
    }
    ctx.success = true;
    yield next();
});
exports.deleteStu = deleteStu;
const updateStu = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const req = ctx.request.body;
    const res = yield stu_service_1.default.updateStu(req);
    if (res === null)
        throw new Error('未找到用户');
    ctx.success = true;
    yield next();
});
exports.updateStu = updateStu;
const getStuByOffset = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset } = ctx.query;
    const res = yield stu_service_1.default.findStuByOffset({
        limit: parseInt(limit),
        offset: parseInt(offset)
    });
    ctx.body = res;
    yield next();
});
exports.getStuByOffset = getStuByOffset;
const getStuById = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield stu_service_1.default.findStuById(ctx.params.id);
    ctx.body = res;
    yield next();
});
exports.getStuById = getStuById;
const searchStu = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const req = ctx.request.body;
    req.limit = parseInt(req.limit);
    req.offset = parseInt(req.offset);
    try {
        ctx.body = yield stu_service_1.default.searchStu(req);
    }
    catch (e) {
        throw new Error('参数错误!是否传入了offset和limit?');
    }
    yield next();
});
exports.searchStu = searchStu;
