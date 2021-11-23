"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatchController = void 0;
const MatchesRepository_1 = require("@game/repositories/implementations/MatchesRepository");
const UsersRepository_1 = require("@user/repositories/implementations/UsersRepository");
const CreateMatchController_1 = require("./CreateMatchController");
const CreateMatchUseCase_1 = require("./CreateMatchUseCase");
const matchesRepository = MatchesRepository_1.MatchesRepository.getInstance();
const usersRepository = UsersRepository_1.UsersRepository.getInstance();
const createMatchUseCase = new CreateMatchUseCase_1.CreateMatchUseCase(matchesRepository, usersRepository);
const createMatchController = new CreateMatchController_1.CreateMatchController(createMatchUseCase);
exports.createMatchController = createMatchController;
//# sourceMappingURL=index.js.map