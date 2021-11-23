import { Request, Response } from 'express';
import { CreateMatchUseCase } from './CreateMatchUseCase';
declare class CreateMatchController {
    private createMatchUseCase;
    constructor(createMatchUseCase: CreateMatchUseCase);
    handle(request: Request, response: Response): Response;
}
export { CreateMatchController };
