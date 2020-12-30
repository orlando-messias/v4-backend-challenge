import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import User from '../models/User';
import UsersServices from '../services/UsersServices';
import { authenticate } from '../services/authenticate';

export default class UserController {

  // user login and authenticate
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    const user = await getRepository(User).findOne({
      where: { email }
    });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    // only email and password are important to authenticate
    const { id, name, created_at, updated_at, ...credentials } = user;
    const token = authenticate(credentials);

    return res.status(200).json({ id, name, email, token });
  };

  // save a new user
  async saveUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const usersServices = new UsersServices();

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    // validate if email is a valid email
    if (!usersServices.validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email entry' });
    }

    // validate password
    if (!usersServices.validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must contains letters, numbers and at least 6 characters'
      });
    }

    const usersRepository = getRepository(User);
    const data = { name, email, password };

    const isValidEmail = usersRepository.create({
      email
    });
    const errors = await validate(isValidEmail);
    if (errors.length !== 0) {
      return res.status(400).json(errors.map(err => err.constraints));
    }

    try {
      await usersRepository.save(data);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send({ message: `Error trying to save: ${error}.` });
    }

  };

};