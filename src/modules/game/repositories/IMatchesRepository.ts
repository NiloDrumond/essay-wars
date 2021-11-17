import { Match } from '@game/model/Match';
import { User } from '@user/model/User';

interface ICreateMatchDTO {
  users: User[];
}

interface IMatchesRepository {
  list(): Match[];
  create(data: ICreateMatchDTO): Match;
}

export { ICreateMatchDTO, IMatchesRepository };
