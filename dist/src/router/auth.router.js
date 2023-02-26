"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_middleware_1 = require("../crud/auth/auth.middleware");
const router = new Router({ prefix: '/api/login' });
router.post('/', auth_middleware_1.verifyLogin, auth_middleware_1.setSession);
router.get('/', auth_middleware_1.verifyAuth);
router.delete('/', auth_middleware_1.logOut);
exports.default = router;
