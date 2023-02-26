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
exports.dispathDefaultAvatar = exports.removeRedundantFile = exports.scheduleHandler = void 0;
const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const stu_service_1 = require("../crud/stu/stu.service");
const lockHandler_1 = require("./lockHandler");
const scheduleHandler = () => {
    schedule.scheduleJob('0 0 3 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        lockHandler_1.lock.p();
        yield removeRedundantFile();
        yield dispathDefaultAvatar();
        lockHandler_1.lock.v();
    }));
    schedule.scheduleJob('0 59 2 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        lockHandler_1.lock.p();
    }));
    schedule.scheduleJob('0 20 3 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        lockHandler_1.lock.v();
    }));
};
exports.scheduleHandler = scheduleHandler;
const removeRedundantFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const allStuFile = yield stu_service_1.default.allStuFile();
    const allFile = fs.readdirSync(path.resolve(__dirname, '../file/avatar'));
    for (const file of allFile) {
        if (!allStuFile.has(file) && file !== 'default.png') {
            fs.unlinkSync(path.resolve(__dirname, `../file/avatar/${file}`));
        }
    }
});
exports.removeRedundantFile = removeRedundantFile;
const dispathDefaultAvatar = () => __awaiter(void 0, void 0, void 0, function* () {
    const allStuFile = yield stu_service_1.default.allStuFileWithId();
    const allFile = fs.readdirSync(path.resolve(__dirname, '../file/avatar'));
    const allFileSet = new Set(allFile);
    for (const key of allStuFile.keys()) {
        if (!allFileSet.has(key.avatar)) {
            yield stu_service_1.default.updateAvatar(key._id, 'default.png');
        }
    }
});
exports.dispathDefaultAvatar = dispathDefaultAvatar;
