"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const UsersRepository_1 = require("../../repositories/implementations/UsersRepository");
const CreateUserController_1 = require("./CreateUserController");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
const usersRepository = UsersRepository_1.UsersRepository.getInstance();
const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController_1.CreateUserController(createUserUseCase);
exports.createUserController = createUserController;
//# sourceMappingURL=index.js.map