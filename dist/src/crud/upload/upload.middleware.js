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
exports.doDelete = exports.formatRes = exports.deleteResource = exports.createResource = exports.getResource = void 0;
const path = require("path");
const multer = require("@koa/multer");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../../file/${file.fieldname}`));
    },
    filename: function (req, file, cb) {
        const type = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${Date.now().toString(13)}${Math.floor(Math.random() * 999)}.${type}`);
    }
});
const limits = {
    fields: 10,
    fileSize: 500 * 1024,
    files: 1
};
const upload = multer({ storage, limits });
const createResource = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'md', maxCount: 1 }
]);
exports.createResource = createResource;
const getResource = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, field } = ctx.params;
    if (fileName === undefined) {
        throw new Error('请提供文件名');
    }
    const filePath = path.resolve(__dirname, `../../file/${field}/${fileName}`);
    let file;
    try {
        file = fs.readFileSync(filePath);
    }
    catch (e) {
        ctx.success = false;
        throw new Error('文件路径有误或已经删除!');
    }
    ctx.body = file;
    if (field === 'md') {
        ctx.body = file.toString();
        yield next();
    }
});
exports.getResource = getResource;
const deleteResource = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { fileName, field } = ctx.params;
    const filePath = `${field}/${fileName}`;
    doDelete(filePath);
    ctx.msg = 'ok!';
    ctx.success = true;
    yield next();
});
exports.deleteResource = deleteResource;
const doDelete = (file) => {
    const filePath = path.resolve(__dirname, `../../file/${file}`);
    try {
        fs.unlinkSync(filePath);
    }
    catch (e) {
        throw new Error('文件路径有误或已经删除');
    }
};
exports.doDelete = doDelete;
const formatRes = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (JSON.stringify(ctx.files) === '{}')
        throw new Error('上传图片为空!');
    ctx.body = ctx.files.avatar[0].filename;
    console.log('上传成功');
    yield next();
});
exports.formatRes = formatRes;
