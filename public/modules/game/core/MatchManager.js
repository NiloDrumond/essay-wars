"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchManager = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("@game/data/constants");
const io_1 = require("@game/infra/io");
const Word_1 = require("@game/model/Word");
const generateWord_1 = require("@game/services/generateWord");
const getSpawnInterval_1 = require("@game/services/getSpawnInterval");
const parseMatch_1 = require("@game/services/parseMatch");
const parsePlayer_1 = require("@game/services/parsePlayer");
const lerp_1 = require("src/utils/lerp");
const sleep_1 = require("src/utils/sleep");
const utils_1 = require("./utils");
class MatchManager {
    constructor({ match }) {
        this.ticksPassed = 0;
        this.lastSpawnTick = 0;
        this.spawnInterval = constants_1.BASE_INTERVAL;
        this.match = match;
        this.nsp = io_1.io.of(`/match/${match.id}`);
        this.listenToConnection();
    }
    handleWordFinished(socket, wordId) {
        const player = utils_1.MatchUtils.getPlayerFromSocket({
            match: this.match,
            socket: socket,
        });
        if (player) {
            player.board.removeWord(wordId);
        }
    }
    checkMatchEnded() {
        const players = Object.values(this.match.players);
        let remaining = 0;
        for (let i = 0; i < players.length; i++) {
            if (players[i].hp > 0) {
                remaining++;
            }
        }
        if (remaining < 2) {
            this.match.onGoing = false;
            this.nsp.emit('message', { isError: false, text: 'match ended' });
        }
    }
    damagePlayer(player, dmg) {
        if (player.hp <= dmg) {
            player.hp = 0;
            this.checkMatchEnded();
        }
        else {
            player.hp -= dmg;
        }
        const players = Object.values(this.match.players);
        for (let i = 0; i < players.length; i++) {
            const p = players[i];
            if (p.socket) {
                if (p.id === player.id) {
                    p.socket.emit('update_player', (0, parsePlayer_1.parsePlayer)(player));
                }
                else {
                    p.socket.emit('other_player_update', {
                        hp: player.hp,
                        id: player.id,
                    });
                }
            }
        }
    }
    moveWord(word) {
        const now = new Date();
        const expire = new Date(word.createdAt.getTime() + constants_1.WORD_DURATION);
        if (expire.getTime() <= now.getTime()) {
            this.damagePlayer(this.match.players[word.targetId], word.word.length);
            this.match.players[word.targetId].board.removeWord(word.id);
        }
        else {
            const position = (0, lerp_1.lerp)(0, 100, (now.getTime() - word.createdAt.getTime()) / constants_1.WORD_DURATION);
            word.position = position;
        }
    }
    spawnWord() {
        const players = Object.values(this.match.players);
        const text = (0, generateWord_1.generateWord)();
        for (let i = 0; i < players.length; i++) {
            const word = new Word_1.Word({
                word: text,
                targetId: players[i].id,
            });
            players[i].board.addWord(word);
        }
    }
    tick() {
        const players = Object.values(this.match.players);
        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            for (let j = 0; j < player.board.words.length; j++) {
                this.moveWord(player.board.words[j]);
            }
            if (player.socket) {
                player.socket.emit('update_player', (0, parsePlayer_1.parsePlayer)(player));
            }
        }
    }
    tickCycle() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            for (let i = 0; i < Infinity; i++) {
                if (this.ticksPassed - this.lastSpawnTick >= this.spawnInterval) {
                    this.spawnWord();
                    this.lastSpawnTick = this.ticksPassed;
                    this.spawnInterval = (0, getSpawnInterval_1.getSpawnInterval)(this.ticksPassed);
                }
                this.tick();
                this.ticksPassed += 1;
                yield (0, sleep_1.sleep)(100);
                if (!this.match.onGoing) {
                    i = Infinity;
                }
            }
        });
    }
    startMatch() {
        this.match.onGoing = true;
        this.nsp.emit('start_match', (0, parseMatch_1.parseMatch)(this.match));
        this.ticksPassed = 0;
        this.lastSpawnTick = 0;
        this.spawnInterval = constants_1.BASE_INTERVAL;
        setTimeout(() => {
            this.tickCycle();
        }, 500);
    }
    handleStartEvent(socket) {
        const player = utils_1.MatchUtils.getPlayerFromSocket({
            match: this.match,
            socket: socket,
        });
        if (player && player.id === this.match.hostId) {
            const players = Object.values(this.match.players);
            for (let i = 0; i < players.length; i++) {
                if (!players[i].socket) {
                    socket.emit('message', {
                        isError: true,
                        text: 'some players have not connected yet.',
                    });
                    return;
                }
            }
            this.startMatch();
        }
    }
    connectPlayer(socket) {
        const player = utils_1.MatchUtils.getPlayerFromSocket({
            match: this.match,
            socket: socket,
        });
        if (player) {
            player.socket = socket;
            // While there isn't a ready and start match option:
            if (player.id !== this.match.hostId) {
                this.startMatch();
            }
            socket.on('start_match', () => this.handleStartEvent(socket));
            socket.on('word_finished', (wordId) => this.handleWordFinished(socket, wordId));
        }
    }
    listenToConnection() {
        this.nsp.on('connection', (socket) => {
            this.connectPlayer(socket);
        });
    }
    addPlayer(player) {
        if (!this.match.onGoing) {
            this.match.players[player.id] = player;
        }
    }
}
exports.MatchManager = MatchManager;
//# sourceMappingURL=MatchManager.js.map