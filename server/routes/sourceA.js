import express from 'express';
import * as sourceAController from '../controllers/sourceAController';

const router = express.Router();

/* GET all users */
router.get('/', sourceAController.getAll);
router.post('/', sourceAController.create);
router.put('/:id', sourceAController.update);

export default router;
