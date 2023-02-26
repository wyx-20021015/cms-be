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
const fs = require("fs");
const path = require("path");
const stu_service_1 = require("../src/crud/stu/stu.service");
const index_1 = require("../src/db/index");
(0, index_1.default)().catch((e) => e);
const removeRedundantFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const allStuFile = yield stu_service_1.default.allStuFile();
    const allFile = fs.readdirSync(path.resolve(__dirname, '../src/file/avatar'));
    for (const file of allFile) {
        if (!allStuFile.has(file) && file !== 'default.png') {
            fs.unlinkSync(path.resolve(__dirname, `../src/file/avatar/${file}`));
        }
    }
});
removeRedundantFile()
    .then(() => {
    console.log('use ctrl+c to exit..');
})
    .catch((e) => e);
