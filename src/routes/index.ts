import { Router } from 'express';

import { userRoutes } from './user.routes';
import { matchRoutes } from './match.routes';
const router = Router();

router.use('/user', userRoutes);
router.use('/match', matchRoutes);

export { router };
