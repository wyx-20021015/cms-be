"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const seesionSchema = new mongoose_1.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Object, required: true }
}, { timestamps: true, versionKey: false });
const seesionModel = (0, mongoose_1.model)('session', seesionSchema);
exports.default = seesionModel;
