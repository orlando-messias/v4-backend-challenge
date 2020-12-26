import { Router } from 'express';
import ToolController from '../controller/ToolController';

const toolsRoute = Router();
const toolController = new ToolController();

toolsRoute.get('/', toolController.getAll);
toolsRoute.get('/:id', toolController.getToolById);
// toolsRoute.get('/search', toolController.searchTool);
toolsRoute.post('/', toolController.save);
toolsRoute.delete('/:id', toolController.deleteTool);

export default toolsRoute;