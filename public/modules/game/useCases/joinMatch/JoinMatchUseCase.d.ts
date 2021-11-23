import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { IMatchesRepository } from '@game/repositories/IMatchesRepository';
import { IUsersRepository } from '@user/repositories/IUsersRepository';
interface IRequest {
    userId: string;
    code: string;
}
interface IResponse {
    player: Player;
    match: Pick<Match, 'code' | 'id'>;
}
declare class JoinMatchUseCase {
    private matchesRepository;
    private usersRepository;
    constructor(matchesRepository: IMatchesRepository, usersRepository: IUsersRepository);
    execute({ userId, code }: IRequest): IResponse;
}
export { JoinMatchUseCase };
