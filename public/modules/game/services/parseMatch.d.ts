import { IMatchDTO } from '@game/core/interfaces/events';
import { Match } from '@game/model/Match';
declare function parseMatch(match: Match): IMatchDTO;
export { parseMatch };
