import { MatchManager } from '@game/core/MatchManager';
import { IMatchesRepository, ICreateMatchDTO, IJoinMatchDTO, IMatchResponseDTO } from '../IMatchesRepository';
declare class MatchesRepository implements IMatchesRepository {
    private matches;
    private static INSTANCE;
    constructor();
    static getInstance(): MatchesRepository;
    findByCode(code: string): MatchManager | undefined;
    private getCode;
    create({ user }: ICreateMatchDTO): IMatchResponseDTO;
    join({ code, user }: IJoinMatchDTO): IMatchResponseDTO;
    list(): MatchManager[];
}
export { MatchesRepository };
