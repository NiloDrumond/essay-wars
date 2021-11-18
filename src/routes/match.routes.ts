import { createMatchController } from '@game/useCases/createMatch';
import { joinMatchController } from '@game/useCases/joinMatch';
import { Router } from 'express';
const matchRoutes = Router();

matchRoutes.post('/', (request, response) => {
  return createMatchController.handle(request, response);
});

matchRoutes.post('/:code', (request, response) => {
  return joinMatchController.handle(request, response);
});

export { matchRoutes };
