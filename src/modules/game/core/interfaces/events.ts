import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { Word } from '@game/model/Word';

export interface MessageEventData {
  isError: boolean;
  text: string;
}

export interface ServerToClientEvents {
  message: (data: MessageEventData) => void;
  update_player: (data: Player) => void;
  other_player_update: (data: Pick<Player, 'hp' | 'id'>) => void;
  start_match: (match: Match) => void;
}

export interface ClientToServerEvents extends ServerToClientEvents {
  start_match: () => void;
  word_finished: (wordId: string) => void;
}
