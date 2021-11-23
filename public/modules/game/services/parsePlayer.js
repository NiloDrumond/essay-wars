"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePlayer = void 0;
function parsePlayer(player) {
    return {
        board: player.board,
        created_at: player.created_at,
        hp: player.hp,
        id: player.id,
        user: player.user,
    };
}
exports.parsePlayer = parsePlayer;
//# sourceMappingURL=parsePlayer.js.map