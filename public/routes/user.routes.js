"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const createUser_1 = require("@user/useCases/createUser");
const express_1 = require("express");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
userRoutes.post('/', (request, response) => {
    return createUser_1.createUserController.handle(request, response);
});
//# sourceMappingURL=user.routes.js.map