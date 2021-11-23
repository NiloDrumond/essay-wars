"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMatchUseCase = void 0;
class CreateMatchUseCase {
    constructor(matchesRepository, usersRepository) {
        this.matchesRepository = matchesRepository;
        this.usersRepository = usersRepository;
    }
    execute({ userId }) {
        const user = this.usersRepository.findById(userId);
        if (!user) {
            throw new Error('user not found');
        }
        const { player, match } = this.matchesRepository.create({ user });
        return { player, match };
    }
}
exports.CreateMatchUseCase = CreateMatchUseCase;
//# sourceMappingURL=CreateMatchUseCase.js.map