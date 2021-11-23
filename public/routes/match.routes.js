"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRoutes = void 0;
const createMatch_1 = require("@game/useCases/createMatch");
const joinMatch_1 = require("@game/useCases/joinMatch");
const express_1 = require("express");
const matchRoutes = (0, express_1.Router)();
exports.matchRoutes = matchRoutes;
matchRoutes.post('/', (request, response) => {
    return createMatch_1.createMatchController.handle(request, response);
});
matchRoutes.post('/:code', (request, response) => {
    return joinMatch_1.joinMatchController.handle(request, response);
});
//# sourceMappingURL=match.routes.js.map