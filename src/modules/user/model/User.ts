import { v4 } from 'uuid';

interface IUserConstructorDTO {
  nickname: string;
}

class User {
  id: string;
  nickname: string;
  created_at: Date;

  constructor({ nickname }: IUserConstructorDTO) {
    this.id = v4();
    this.created_at = new Date();
    this.nickname = nickname;
  }
}

export { User };
