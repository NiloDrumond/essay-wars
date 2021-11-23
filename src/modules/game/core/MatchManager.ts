import { BASE_INTERVAL, WORD_DURATION } from '@game/data/constants';
import { io } from '@game/infra/io';
import { MyNamespace, MySocket } from '@game/infra/types';
import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
import { Word } from '@game/model/Word';
import { generateWord } from '@game/services/generateWord';
import { getSpawnInterval } from '@game/services/getSpawnInterval';
import { parseMatch } from '@game/services/parseMatch';
import { parsePlayer } from '@game/services/parsePlayer';
import { Socket } from 'socket.io';
import { lerp } from 'src/utils/lerp';
import { sleep } from 'src/utils/sleep';
import { MatchUtils } from './utils';

interface IMatchManagerConstructorDTO {
  match: Match;
}

class MatchManager {
  public match: Match;
  private ticksPassed = 0;
  private lastSpawnTick = 0;
  private spawnInterval = BASE_INTERVAL;
  private nsp: MyNamespace;

  private handleWordFinished(socket: Socket, wordId: string) {
    const player = MatchUtils.getPlayerFromSocket({
      match: this.match,
      socket: socket,
    });
    if (player) {
      player.board.removeWord(wordId);
    }
  }

  private checkMatchEnded() {
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

  private damagePlayer(player: Player, dmg: number) {
    if (player.hp <= dmg) {
      player.hp = 0;
      this.checkMatchEnded();
    } else {
      player.hp -= dmg;
    }
    const players = Object.values(this.match.players);
    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      if (p.socket) {
        if (p.id === player.id) {
          p.socket.emit('update_player', parsePlayer(player));
        } else {
          p.socket.emit('other_player_update', {
            hp: player.hp,
            id: player.id,
          });
        }
      }
    }
  }

  private moveWord(word: Word) {
    const now = new Date();
    const expire = new Date(word.createdAt.getTime() + WORD_DURATION);
    if (expire.getTime() <= now.getTime()) {
      this.damagePlayer(this.match.players[word.targetId], word.word.length);
      this.match.players[word.targetId].board.removeWord(word.id);
    } else {
      const position = lerp(
        0,
        100,
        (now.getTime() - word.createdAt.getTime()) / WORD_DURATION,
      );
      word.position = position;
    }
  }

  private spawnWord() {
    const players = Object.values(this.match.players);
    const text = generateWord();
    for (let i = 0; i < players.length; i++) {
      const word = new Word({
        word: text,
        targetId: players[i].id,
      });
      players[i].board.addWord(word);
    }
  }

  private tick() {
    const players = Object.values(this.match.players);
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      for (let j = 0; j < player.board.words.length; j++) {
        this.moveWord(player.board.words[j]);
      }
      if (player.socket) {
        player.socket.emit('update_player', parsePlayer(player));
      }
    }
  }

  private async tickCycle() {
    for (let i = 0; i < Infinity; i++) {
      if (this.ticksPassed - this.lastSpawnTick >= this.spawnInterval) {
        this.spawnWord();
        this.lastSpawnTick = this.ticksPassed;
        this.spawnInterval = getSpawnInterval(this.ticksPassed);
      }
      this.tick();
      this.ticksPassed += 1;
      await sleep(100);
      if (!this.match.onGoing) {
        i = Infinity;
      }
    }
  }

  private startMatch(): void {
    this.match.onGoing = true;
    this.nsp.emit('start_match', parseMatch(this.match));
    this.ticksPassed = 0;
    this.lastSpawnTick = 0;
    this.spawnInterval = BASE_INTERVAL;
    setTimeout(() => {
      this.tickCycle();
    }, 500);
  }

  private handleStartEvent(socket: MySocket): void {
    const player = MatchUtils.getPlayerFromSocket({
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

  private connectPlayer(socket: MySocket): void {
    const player = MatchUtils.getPlayerFromSocket({
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
      socket.on('word_finished', (wordId) =>
        this.handleWordFinished(socket, wordId),
      );
    }
  }

  private listenToConnection() {
    this.nsp.on('connection', (socket) => {
      this.connectPlayer(socket);
    });
  }

  constructor({ match }: IMatchManagerConstructorDTO) {
    this.match = match;
    this.nsp = io.of(`/match/${match.id}`);
    this.listenToConnection();
  }

  public addPlayer(player: Player): void {
    if (!this.match.onGoing) {
      this.match.players[player.id] = player;
    }
  }
}

export { MatchManager };
