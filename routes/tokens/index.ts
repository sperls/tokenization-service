import { Router } from 'express';
import handler from './handler';

const router = Router();

router.get('/', handler.getSecrets);
router.post('/', handler.createToken);
router.put('/:token', handler.updateSecret);
router.delete('/:token', handler.deleteToken);

export default router;
