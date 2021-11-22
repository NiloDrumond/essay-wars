import { IMatchDTO, IPlayersDTO } from '@game/core/interfaces/events';
import { Match } from '@game/model/Match';

function parseMatch(match: Match): IMatchDTO {
  const players = Object.values(match.players);
  const newPlayers: IPlayersDTO = {};
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    newPlayers[p.id] = {
      board: p.board,
      created_at: p.created_at,
      hp: p.hp,
      id: p.id,
      user: p.user,
    };
  }
  return {
    code: match.code,
    id: match.id,
    onGoing: match.onGoing,
    players: newPlayers,
  };
}

export { parseMatch };
