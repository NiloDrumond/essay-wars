import { Request, Response } from 'express';

import { JoinMatchUseCase } from './JoinMatchUseCase';

class JoinMatchController {
  constructor(private createMatchUseCase: JoinMatchUseCase) {}

  handle(request: Request, response: Response): Response {
    const { authorization } = request.headers;
    const { code } = request.params;

    if (!authorization) {
      return response.status(401).send('No authorization id');
    }

    const Match = this.createMatchUseCase.execute({
      userId: authorization,
      code,
    });

    return response.status(201).json({ Match });
  }
}

export { JoinMatchController };
