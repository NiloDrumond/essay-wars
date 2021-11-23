"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMatch = void 0;
const parsePlayer_1 = require("./parsePlayer");
function parseMatch(match) {
    const players = Object.values(match.players);
    const newPlayers = {};
    for (let i = 0; i < players.length; i++) {
        const p = players[i];
        newPlayers[p.id] = (0, parsePlayer_1.parsePlayer)(p);
    }
    return {
        code: match.code,
        id: match.id,
        onGoing: match.onGoing,
        players: newPlayers,
    };
}
exports.parseMatch = parseMatch;
//# sourceMappingURL=parseMatch.js.map