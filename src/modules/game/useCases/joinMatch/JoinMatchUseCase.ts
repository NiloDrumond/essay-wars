import { Player } from '@game/model/Player';
import { IMatchesRepository } from '@game/repositories/IMatchesRepository';
import { IUsersRepository } from '@user/repositories/IUsersRepository';

interface IRequest {
  userId: string;
  code: string;
}

class JoinMatchUseCase {
  constructor(
    private matchesRepository: IMatchesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  execute({ userId, code }: IRequest): Player {
    const user = this.usersRepository.findById(userId);
    if (!user) {
      throw new Error('user not found');
    }

    const player = this.matchesRepository.join({ user, code });

    return player;
  }
}

export { JoinMatchUseCase };
