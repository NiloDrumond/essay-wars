import { IPlayerDTO } from '@game/core/interfaces/events';
import { Player } from '@game/model/Player';

function parsePlayer(player: Player): IPlayerDTO {
  return {
    board: player.board,
    created_at: player.created_at,
    hp: player.hp,
    id: player.id,
    user: player.user,
  };
}

export { parsePlayer };
