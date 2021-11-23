"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor({ nickname }) {
        this.id = (0, uuid_1.v4)();
        this.created_at = new Date();
        this.nickname = nickname;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map