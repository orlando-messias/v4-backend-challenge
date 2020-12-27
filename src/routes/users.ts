import { Router } from 'express';
import UserController from '../controller/UserController';

const usersRoute = Router();
const userController = new UserController();

usersRoute.post('/login', userController.loginUser);
usersRoute.post('/save', userController.saveUser);

export default usersRoute;