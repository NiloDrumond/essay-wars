"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const match_routes_1 = require("./match.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use('/user', user_routes_1.userRoutes);
router.use('/match', match_routes_1.matchRoutes);
//# sourceMappingURL=index.js.map