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
const stu_1 = require("../../db/stu");
class Service {
    deleteStu(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stu_1.default.findByIdAndRemove(id);
        });
    }
    updateStu(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, avatar, name, major, grade, sex, phone, email } = data;
            const res = yield stu_1.default.findByIdAndUpdate(_id, {
                $set: {
                    avatar,
                    name,
                    major,
                    grade,
                    sex,
                    phone,
                    email
                }
            });
            return res;
        });
    }
    createStu(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const stu = new stu_1.default(data);
            yield stu.save();
        });
    }
    allStuFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const set = yield stu_1.default.find({}, ['avatar', '-_id']).catch((e) => console.log(e));
            return new Set(set.map((t) => t.avatar));
        });
    }
    allStuFileWithId() {
        return __awaiter(this, void 0, void 0, function* () {
            const set = yield stu_1.default.find({}, ['avatar']).catch((e) => console.log(e));
            return new Set(set);
        });
    }
    updateAvatar(id, newAvatar) {
        return __awaiter(this, void 0, void 0, function* () {
            yield stu_1.default.findByIdAndUpdate(id, {
                $set: {
                    avatar: newAvatar
                }
            }, {});
        });
    }
    findStuByOffset(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = props;
            const res = yield stu_1.default.find()
                .skip((offset - 1) * limit)
                .limit(limit)
                .catch((e) => console.log(e));
            return res;
        });
    }
    findStuById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield stu_1.default.findById(id);
            return res;
        });
    }
    searchStu(props) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const sex = props.sex ? `^${props.sex}$` : undefined;
            const major = props.major ? `^${props.major}$` : undefined;
            const limit = (_a = props.limit) !== null && _a !== void 0 ? _a : null;
            const offset = (_b = props.offset) !== null && _b !== void 0 ? _b : null;
            let res = yield stu_1.default.aggregate([
                {
                    $match: {
                        grade: { $regex: props.grade || '.*', $options: 'i' },
                        name: { $regex: props.name || '.*', $options: 'i' },
                        major: { $regex: major || '.*', $options: 'i' },
                        sex: { $regex: sex || '.*', $options: 'i' }
                    }
                },
                {
                    $facet: {
                        totalNum: [{ $group: { _id: null, count: { $sum: 1 } } }],
                        data: [
                            { $skip: offset ? (offset - 1) * props.limit : null },
                            { $limit: limit }
                        ]
                    }
                },
                {
                    $project: {
                        count: '$totalNum.count',
                        data: '$data'
                    }
                }
            ]);
            res = res[0];
            res.count = res.count[0];
            return res;
        });
    }
}
exports.default = new Service();
