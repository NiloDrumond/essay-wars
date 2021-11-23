"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesRepository = void 0;
const constants_1 = require("@game/data/constants");
const MatchManager_1 = require("@game/core/MatchManager");
const Player_1 = require("@game/model/Player");
const generateCode_1 = require("@game/services/generateCode");
const Match_1 = require("../../model/Match");
class MatchesRepository {
    constructor() {
        this.matches = [];
    }
    static getInstance() {
        if (!MatchesRepository.INSTANCE) {
            MatchesRepository.INSTANCE = new MatchesRepository();
        }
        return MatchesRepository.INSTANCE;
    }
    findByCode(code) {
        return this.matches.find((m) => m.match.code === code);
    }
    getCode() {
        for (let i = 0; i < constants_1.CODE_RETRIES; i++) {
            const code = (0, generateCode_1.generateCode)();
            const existing = this.findByCode(code);
            if (!existing) {
                return code;
            }
        }
        throw new Error('Unable to generate lobby code');
    }
    create({ user }) {
        const player = new Player_1.Player({ user });
        const code = this.getCode();
        const match = new Match_1.Match({ host: player, code });
        const matchManager = new MatchManager_1.MatchManager({
            match,
        });
        this.matches.push(matchManager);
        return { player, match: { id: match.id, code: match.code } };
    }
    join({ code, user }) {
        const matchManager = this.findByCode(code);
        if (!matchManager) {
            throw new Error('unable to find match');
        }
        const player = new Player_1.Player({ user });
        matchManager.addPlayer(player);
        return {
            player,
            match: { id: matchManager.match.id, code: matchManager.match.code },
        };
    }
    list() {
        return this.matches;
    }
}
exports.MatchesRepository = MatchesRepository;
//# sourceMappingURL=MatchesRepository.js.map