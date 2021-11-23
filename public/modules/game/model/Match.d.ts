import { Player } from './Player';
interface IMatchConstructorDTO {
    host: Player;
    code: string;
}
declare class Match {
    id: string;
    hostId: string;
    code: string;
    onGoing: boolean;
    players: Record<string, Player>;
    constructor({ host, code }: IMatchConstructorDTO);
}
export { Match };
