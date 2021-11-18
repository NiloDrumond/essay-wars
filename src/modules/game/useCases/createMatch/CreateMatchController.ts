import { Request, Response } from 'express';

import { CreateMatchUseCase } from './CreateMatchUseCase';

class CreateMatchController {
  constructor(private createMatchUseCase: CreateMatchUseCase) {}

  handle(request: Request, response: Response): Response {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).send('No authorization id');
    }

    const Match = this.createMatchUseCase.execute({ userId: authorization });

    return response.status(201).json({ Match });
  }
}

export { CreateMatchController };
