"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stu_1 = require("../src/db/stu");
const index_1 = require("../src/db/index");
const fs = require("fs");
const path = require("path");
const grades_1 = require("../src/shared/grades");
const majors_1 = require("../src/shared/majors");
const axios = require('axios');
(0, index_1.default)().catch((e) => console.log(e));
const sexs = ['female', 'male'];
const testData = [];
const randomPhone = () => {
    const phone = [];
    for (let i = 0; i < 9; i++) {
        const randomNum = Math.floor(Math.random() * 10);
        phone.push(randomNum);
    }
    const second = Math.floor(Math.random() * 7) + 3;
    const first = 1;
    phone.unshift(second);
    phone.unshift(first);
    return phone.join('');
};
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data.json'), { encoding: 'utf-8' })).res;
for (const item of data) {
    const name = item.name;
    const img = item.img;
    const sex = sexs[Math.floor(Math.random() * 2)];
    const phone = randomPhone();
    const email = `${randomPhone()}@qq.com`;
    const grade = grades_1.default[Math.floor(Math.random() * grades_1.default.length)];
    const ext = img.split('.').pop();
    const major = majors_1.default[Math.floor(Math.random() * majors_1.default.length)];
    const avatar = `avatar-${Date.now().toString(13)}${Math.floor(Math.random() * 999)}.${ext}`;
    axios.get(img, { responseType: 'arraybuffer' }).then((res) => {
        fs.writeFileSync(path.resolve(__dirname, `../src/file/avatar/${avatar}`), res.data);
    });
    testData.push({
        name,
        avatar,
        sex,
        phone,
        email,
        grade,
        major
    });
}
stu_1.default
    .insertMany(testData)
    .then(function () {
    console.log('Data inserted, use ctrl+c to exit');
})
    .catch(function (error) {
    console.log(error);
});
