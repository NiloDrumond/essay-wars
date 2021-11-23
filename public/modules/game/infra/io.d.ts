import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '../../game/core/interfaces/events';
declare const io: Server<ClientToServerEvents, ServerToClientEvents, import("socket.io/dist/typed-events").DefaultEventsMap>;
export { io };
