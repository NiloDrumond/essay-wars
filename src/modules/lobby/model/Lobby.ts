import { User } from '@user/model/User';
import { v4 } from 'uuid';

interface ILobbyConstructorDTO {
  host: User;
  code: string;
}

class Lobby {
  id: string;
  host: User;
  code: string;
  created_at: Date;

  constructor({ host, code }: ILobbyConstructorDTO) {
    this.id = v4();
    this.created_at = new Date();
    this.host = host;
    this.code = code;
  }
}

export { Lobby };
