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
const mongoose_1 = require("mongoose");
const config_1 = require("../app/config");
function setupMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        const DB_URL = `mongodb://${config_1.MONGO_HOST}:${config_1.MONGO_PORT}/${config_1.MONGO_DB}`;
        (0, mongoose_1.connect)(DB_URL).catch((e) => console.log(e));
        return yield new Promise((resolve, reject) => {
            mongoose_1.connection.on('connected', () => {
                console.log('connected to mongodb');
                resolve();
            });
            mongoose_1.connection.on('error', (error) => {
                console.log('mongodb数据库连接失败', error);
                reject(error);
            });
        });
    });
}
exports.default = setupMongo;
