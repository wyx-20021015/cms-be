"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stuSchema = new mongoose_1.Schema({
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    major: { type: String, required: true },
    grade: { type: String, required: true },
    sex: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: false, versionKey: false });
const stuModel = (0, mongoose_1.model)('Student', stuSchema);
exports.default = stuModel;
