import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from './types';

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

io.listen(3000);

export { io };
