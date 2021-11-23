import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
interface IRequest {
    nickname: string;
}
declare class CreateUserUseCase {
    private usersRepository;
    constructor(usersRepository: IUsersRepository);
    execute({ nickname }: IRequest): User;
}
export { CreateUserUseCase };
