"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinMatchController = void 0;
const MatchesRepository_1 = require("@game/repositories/implementations/MatchesRepository");
const UsersRepository_1 = require("@user/repositories/implementations/UsersRepository");
const JoinMatchController_1 = require("./JoinMatchController");
const JoinMatchUseCase_1 = require("./JoinMatchUseCase");
const matchesRepository = MatchesRepository_1.MatchesRepository.getInstance();
const usersRepository = UsersRepository_1.UsersRepository.getInstance();
const joinMatchUseCase = new JoinMatchUseCase_1.JoinMatchUseCase(matchesRepository, usersRepository);
const joinMatchController = new JoinMatchController_1.JoinMatchController(joinMatchUseCase);
exports.joinMatchController = joinMatchController;
//# sourceMappingURL=index.js.map