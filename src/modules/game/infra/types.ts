import { MessageEventData } from '@game/core/interfaces/events';
import { Socket } from 'socket.io';

export interface ServerToClientEvents {
  message: (data: MessageEventData) => void;
}

export interface ClientToServerEvents extends ServerToClientEvents {
  start_match: () => void;
}

export type MySocket = Socket<ClientToServerEvents, ServerToClientEvents>;
