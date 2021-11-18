import { MatchesRepository } from '@game/repositories/implementations/MatchesRepository';
import { UsersRepository } from '@user/repositories/implementations/UsersRepository';
import { CreateMatchController } from './CreateMatchController';
import { CreateMatchUseCase } from './CreateMatchUseCase';

const matchesRepository = MatchesRepository.getInstance();
const usersRepository = UsersRepository.getInstance();
const createMatchUseCase = new CreateMatchUseCase(
  matchesRepository,
  usersRepository,
);
const createMatchController = new CreateMatchController(createMatchUseCase);

export { createMatchController };
