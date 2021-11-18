import { MatchManager } from '@game/core/MatchManager';
import { Player } from '@game/model/Player';
import { User } from '@user/model/User';

interface ICreateMatchDTO {
  user: User;
}

interface IJoinMatchDTO {
  code: string;
  user: User;
}
interface IMatchesRepository {
  list(): MatchManager[];
  create(data: ICreateMatchDTO): Player;
  join(data: IJoinMatchDTO): Player;
}

export { ICreateMatchDTO, IMatchesRepository, IJoinMatchDTO };
