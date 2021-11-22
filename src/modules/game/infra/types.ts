import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '@game/core/interfaces/events';
import { Namespace, Socket } from 'socket.io';

export type MySocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type MyNamespace = Namespace<ClientToServerEvents, ServerToClientEvents>;
