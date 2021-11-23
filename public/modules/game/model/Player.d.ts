import { MySocket } from '@game/infra/types';
import { User } from '@user/model/User';
import { Board } from './Board';
interface IPlayerConstructorDTO {
    user: User;
}
declare class Player {
    id: string;
    user: User;
    hp: number;
    board: Board;
    created_at: Date;
    socket?: MySocket;
    constructor({ user }: IPlayerConstructorDTO);
    reset(): void;
}
export { Player };
