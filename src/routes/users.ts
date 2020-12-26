import { Router } from 'express';
import UserController from '../controller/UserController';

const usersRoute = Router();
const userController = new UserController();

usersRoute.get('/', userController.getUser);
usersRoute.post('/', userController.saveUser);

export default usersRoute;