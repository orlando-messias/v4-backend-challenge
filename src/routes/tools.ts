import { Router } from 'express';
import ToolController from '../controller/ToolController';
import { auth } from '../middlewares/auth';

const toolsRoute = Router();
const toolController = new ToolController();

toolsRoute.get('/', toolController.getAll);
toolsRoute.get('/:id', toolController.getToolById);
toolsRoute.post('/', toolController.saveTool);
toolsRoute.delete('/:id', toolController.deleteTool);

export default toolsRoute;