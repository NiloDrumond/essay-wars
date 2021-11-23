import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
declare class CreateUserController {
    private createUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase);
    handle(request: Request, response: Response): Response;
}
export { CreateUserController };
