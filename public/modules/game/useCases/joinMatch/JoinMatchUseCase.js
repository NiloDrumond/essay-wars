"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinMatchUseCase = void 0;
class JoinMatchUseCase {
    constructor(matchesRepository, usersRepository) {
        this.matchesRepository = matchesRepository;
        this.usersRepository = usersRepository;
    }
    execute({ userId, code }) {
        const user = this.usersRepository.findById(userId);
        if (!user) {
            throw new Error('user not found');
        }
        const { match, player } = this.matchesRepository.join({ user, code });
        return { match, player };
    }
}
exports.JoinMatchUseCase = JoinMatchUseCase;
//# sourceMappingURL=JoinMatchUseCase.js.map