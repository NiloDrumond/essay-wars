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
  const { auth } = socket.handshake;
  if (typeof auth === 'string') {
    if (match.players[auth]) {
      return match.players[auth];
    }
  }
}
