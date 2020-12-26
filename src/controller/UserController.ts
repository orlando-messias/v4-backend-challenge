import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import User from '../models/User';
import UsersServices from '../services/UsersServices';

const usersServices = new UsersServices();

export default class UserController {

  async getUser(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.find();

    return res.status(200).json(user);
  }

  async saveUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

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