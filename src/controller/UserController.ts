import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import User from '../models/User';

export default class UserController {

  async getUser(req: Request, res: Response) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.find();

    return res.status(200).json(user);
  }

  async save(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    const usersRepository = getRepository(User);
    const data = { name, email, password };
    
    const isValidEmail = usersRepository.create({
      email
    });
    const errors = await validate(isValidEmail);
    if(errors.length !== 0) {
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