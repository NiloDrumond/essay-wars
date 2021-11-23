"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Match = void 0;
const uuid_1 = require("uuid");
class Match {
    constructor({ host, code }) {
        this.id = (0, uuid_1.v4)();
        this.code = code;
        this.onGoing = false;
        this.players = { [host.id]: host };
        this.hostId = host.id;
    }
}
exports.Match = Match;
//# sourceMappingURL=Match.js.map