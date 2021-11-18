import { MatchesRepository } from '@game/repositories/implementations/MatchesRepository';
import { UsersRepository } from '@user/repositories/implementations/UsersRepository';
import { JoinMatchController } from './JoinMatchController';
import { JoinMatchUseCase } from './JoinMatchUseCase';

const matchesRepository = MatchesRepository.getInstance();
const usersRepository = UsersRepository.getInstance();
const joinMatchUseCase = new JoinMatchUseCase(
  matchesRepository,
  usersRepository,
);
const joinMatchController = new JoinMatchController(joinMatchUseCase);

export { joinMatchController };
