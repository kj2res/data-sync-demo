import express from 'express';
import * as sourceBController from '../controllers/sourceBController';

const router = express.Router();

/* GET all users */
router.get('/', sourceBController.getAll);
router.post('/', sourceBController.create);
router.post('/:id', sourceBController.update);


export default router;
