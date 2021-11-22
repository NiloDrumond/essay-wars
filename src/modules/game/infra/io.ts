import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '../../game/core/interfaces/events';

const io = new Server<ClientToServerEvents, ServerToClientEvents>();

io.listen(3000, {
    cors: {
        origin: "*"
    }
});

export { io };
