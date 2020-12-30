import { Router } from 'express';
import ToolController from '../controller/ToolController';
import { auth } from '../middlewares/auth';

const toolsRoute = Router();
const toolController = new ToolController();

toolsRoute.get('/', toolController.getAll);
toolsRoute.get('/:id', toolController.getToolById);
toolsRoute.post('/', auth, toolController.saveTool);
toolsRoute.delete('/:id', auth, toolController.deleteTool);

export default toolsRoute;