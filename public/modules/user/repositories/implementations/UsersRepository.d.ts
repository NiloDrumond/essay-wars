import { User } from '../../model/User';
import { IUsersRepository, ICreateUserDTO } from '../IUsersRepository';
declare class UsersRepository implements IUsersRepository {
    private users;
    private static INSTANCE;
    constructor();
    static getInstance(): UsersRepository;
    create({ nickname }: ICreateUserDTO): User;
    findById(id: string): User | undefined;
    list(): User[];
}
export { UsersRepository };
