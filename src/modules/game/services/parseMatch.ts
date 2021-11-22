import { IMatchDTO, IPlayerDTO } from '@game/core/interfaces/events';
import { Match } from '@game/model/Match';
import { parsePlayer } from './parsePlayer';

function parseMatch(match: Match): IMatchDTO {
  const players = Object.values(match.players);
  const newPlayers: Record<string, IPlayerDTO> = {};
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    newPlayers[p.id] = parsePlayer(p);
  }
  return {
    code: match.code,
    id: match.id,
    onGoing: match.onGoing,
    players: newPlayers,
  };
}

export { parseMatch };
