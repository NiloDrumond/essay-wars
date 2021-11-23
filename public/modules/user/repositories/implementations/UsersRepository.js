"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const User_1 = require("../../model/User");
class UsersRepository {
    constructor() {
        this.users = [];
    }
    static getInstance() {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository();
        }
        return UsersRepository.INSTANCE;
    }
    create({ nickname }) {
        const user = new User_1.User({ nickname });
        this.users.push(user);
        return user;
    }
    findById(id) {
        return this.users.find((u) => u.id === id);
    }
    list() {
        return this.users;
    }
}
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=UsersRepository.js.map