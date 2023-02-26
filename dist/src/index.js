"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./app/config");
app_1.default.listen(config_1.APP_PORT, () => {
    console.log(`service working on ${config_1.APP_PORT}..`);
});
