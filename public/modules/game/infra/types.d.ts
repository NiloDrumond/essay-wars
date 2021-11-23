import { ClientToServerEvents, ServerToClientEvents } from '@game/core/interfaces/events';
import { Namespace, Socket } from 'socket.io';
export declare type MySocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export declare type MyNamespace = Namespace<ClientToServerEvents, ServerToClientEvents>;
