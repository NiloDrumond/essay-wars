import { MySocket } from '@game/infra/types';
import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';

interface IGetPlayerFromSocketDTO {
  match: Match;
  socket: MySocket;
}

export function getPlayerFromSocket({
  match,
  socket,
}: IGetPlayerFromSocketDTO): Player | undefined {
  const { playerId } = socket.handshake.auth;
  if (typeof playerId === 'string') {
    if (match.players[playerId]) {
      return match.players[playerId];
    }
  }
}
