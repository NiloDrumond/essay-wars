import { Match } from '@game/model/Match';
import { Player } from '@game/model/Player';
interface IMatchManagerConstructorDTO {
    match: Match;
}
declare class MatchManager {
    match: Match;
    private ticksPassed;
    private lastSpawnTick;
    private spawnInterval;
    private nsp;
    private handleWordFinished;
    private checkMatchEnded;
    private damagePlayer;
    private moveWord;
    private spawnWord;
    private tick;
    private tickCycle;
    private startMatch;
    private handleStartEvent;
    private connectPlayer;
    private listenToConnection;
    constructor({ match }: IMatchManagerConstructorDTO);
    addPlayer(player: Player): void;
}
export { MatchManager };
