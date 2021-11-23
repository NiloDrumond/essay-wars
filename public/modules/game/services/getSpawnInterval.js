"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpawnInterval = void 0;
const constants_1 = require("@game/data/constants");
function getSpawnInterval(ticks) {
    return Math.max(constants_1.BASE_INTERVAL - Math.sqrt(ticks / 1.5), 1);
}
exports.getSpawnInterval = getSpawnInterval;
//# sourceMappingURL=getSpawnInterval.js.map