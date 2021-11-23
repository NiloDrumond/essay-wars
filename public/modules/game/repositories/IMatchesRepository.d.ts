import { MatchManager } from '@game/core/MatchManager';
import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { User } from '@user/model/User';
interface ICreateMatchDTO {
    user: User;
}
interface IJoinMatchDTO {
    code: string;
    user: User;
}
export interface IMatchResponseDTO {
    player: Player;
    match: Pick<Match, 'code' | 'id'>;
}
interface IMatchesRepository {
    list(): MatchManager[];
    create(data: ICreateMatchDTO): IMatchResponseDTO;
    join(data: IJoinMatchDTO): IMatchResponseDTO;
}
export { ICreateMatchDTO, IMatchesRepository, IJoinMatchDTO };
