import { IPlayerDTO } from '@game/core/interfaces/events';
import { Player } from '@game/model/Player';
declare function parsePlayer(player: Player): IPlayerDTO;
export { parsePlayer };
