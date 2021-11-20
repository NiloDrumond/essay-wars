import { Player } from '@game/model/Player';
import { IMatchesRepository } from '@game/repositories/IMatchesRepository';
import { IUsersRepository } from '@user/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

interface IResponse {
  player: Player;
  matchId: string;
}

class CreateMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  execute({ userId }: IRequest): IResponse {
    const user = this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('user not found');
    }

    const { player, matchId } = this.matchesRepository.create({ user });

    return { player, matchId };
  }
}

export { CreateMatchUseCase };
