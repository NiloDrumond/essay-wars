import { Request, Response } from 'express';

import { JoinMatchUseCase } from './JoinMatchUseCase';

class JoinMatchController {
  constructor(private joinMatchUseCase: JoinMatchUseCase) {}

  handle(request: Request, response: Response): Response {
    const { authorization } = request.headers;
    const { code } = request.params;

    if (!authorization) {
      return response.status(401).send('No authorization id');
    }

    const { matchId, player } = this.joinMatchUseCase.execute({
      userId: authorization,
      code,
    });

    return response.status(201).json({ matchId, player });
  }
}

export { JoinMatchController };
