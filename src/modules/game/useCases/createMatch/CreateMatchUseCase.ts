import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { IMatchesRepository } from '@game/repositories/IMatchesRepository';
import { IUsersRepository } from '@user/repositories/IUsersRepository';

interface IRequest {
  userId: string;
}

interface IResponse {
  player: Player;
  match: Pick<Match, 'code' | 'id'>;
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

    const { player, match } = this.matchesRepository.create({ user });

    return { player, match };
  }
}

export { CreateMatchUseCase };
