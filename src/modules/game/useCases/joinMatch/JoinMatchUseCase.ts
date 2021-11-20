import { Player } from '@game/model/Player';
import { IMatchesRepository } from '@game/repositories/IMatchesRepository';
import { IUsersRepository } from '@user/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  code: string;
}

interface IResponse {
  player: Player;
  matchId: string;
}

class JoinMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  execute({ userId, code }: IRequest): IResponse {
    const user = this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('user not found');
    }

    const { matchId, player } = this.matchesRepository.join({ user, code });

    return { matchId, player };
  }
}

export { JoinMatchUseCase };
