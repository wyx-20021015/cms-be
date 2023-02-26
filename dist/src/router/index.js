"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const useRoutes = function (app) {
    fs.readdirSync(__dirname).forEach((file) => {
        const router = require(`./${file}`).default;
        if (router.methods === undefined) {
            return;
        }
        app.use(router.routes());
        app.use(router.allowedMethods());
    });
};
exports.default = useRoutes;
