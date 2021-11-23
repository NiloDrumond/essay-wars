"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerFromSocket = void 0;
function getPlayerFromSocket({ match, socket, }) {
    const { playerId } = socket.handshake.auth;
    if (typeof playerId === 'string') {
        if (match.players[playerId]) {
            return match.players[playerId];
        }
    }
}
exports.getPlayerFromSocket = getPlayerFromSocket;
//# sourceMappingURL=getPlayerFromSocket.js.map