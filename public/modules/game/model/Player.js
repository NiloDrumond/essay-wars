"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const constants_1 = require("@game/data/constants");
const uuid_1 = require("uuid");
const Board_1 = require("./Board");
class Player {
    constructor({ user }) {
        this.id = (0, uuid_1.v4)();
        this.created_at = new Date();
        this.user = user;
        this.hp = constants_1.INITIAL_HP;
        this.board = new Board_1.Board();
        this.socket = undefined;
    }
    reset() {
        this.hp = constants_1.INITIAL_HP;
        this.board = new Board_1.Board();
    }
}
exports.Player = Player;
//# sourceMappingURL=Player.js.map