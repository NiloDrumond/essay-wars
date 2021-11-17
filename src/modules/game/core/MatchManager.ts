import { Match } from '@game/model/Match';

interface IMatchManagerConstructorDTO {
  match: Match;
}

class MatchManager {
  private match: Match;

  constructor({ match }: IMatchManagerConstructorDTO) {
    this.match = match;
  }
}
