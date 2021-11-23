import { MySocket } from '@game/infra/types';
import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
interface IGetPlayerFromSocketDTO {
    match: Match;
    socket: MySocket;
}
export declare function getPlayerFromSocket({ match, socket, }: IGetPlayerFromSocketDTO): Player | undefined;
export {};
