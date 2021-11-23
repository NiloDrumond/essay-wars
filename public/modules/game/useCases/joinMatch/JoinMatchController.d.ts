import { Request, Response } from 'express';
import { JoinMatchUseCase } from './JoinMatchUseCase';
declare class JoinMatchController {
    private joinMatchUseCase;
    constructor(joinMatchUseCase: JoinMatchUseCase);
    handle(request: Request, response: Response): Response;
}
export { JoinMatchController };
