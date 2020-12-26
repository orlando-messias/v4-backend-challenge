import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import Tool from '../models/Tool';
import Tag from '../models/Tag';
import tools_view from '../views/tools_view';
import ToolsServices from '../services/ToolsServices';

const toolsServices = new ToolsServices();

export default class ToolController {

  async getAll(req: Request, res: Response) {
    const toolsRepository = getRepository(Tool);
    const { tag } = req.query;

    if (tag) {
      const tagsRepository = getRepository(Tag);

      const tools = await tagsRepository.find({
        relations: ['tool'],
        where: { name: tag },
      });

      const newTools = tools.map(item => item.tool);
      return res.status(200).json(tools_view.renderMany(newTools));
    }

    const tools = await toolsRepository.find({
      relations: ['tags'],
    });

    return res.status(200).json(tools_view.renderMany(tools));
  };

  async getToolById(req: Request, res: Response) {
    const { id } = req.params;
    const toolsRepository = getRepository(Tool);

    const tool = await toolsRepository.findOne({ id: Number(id) });

    if (!tool) {
      res.status(404).send({ message: "Tool not found" });
      return;
    }

    return res.status(200).json(tools_view.render(tool));
  }

  async save(req: Request, res: Response) {
    const { title, link, description, tags } = req.body;

    if (!title || !link || !description || !tags) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    // validate if link is a valid link
    if (!toolsServices.validateLink(link)){
      return res.status(400).json({ message: 'Invalid link entry' });
    }

    const toolsRepository = getRepository(Tool);
    const tagsRepository = getRepository(Tag);

    // validate both link and description characters length
    const isValidLength = toolsRepository.create({
      link,
      description
    });
    const errors = await validate(isValidLength);
    if(errors.length !== 0) {
      return res.status(400).json(errors.map(err => err.constraints));
    }

    try {
      let tagsToInsert: Tag[] = [] as Tag[];

      tags.map((tagName: string) => {
        const newTag = new Tag();
        newTag.name = tagName;
        tagsToInsert.push(newTag);
      });

      await tagsRepository.save(tagsToInsert);

      const newTool = new Tool();

      newTool.title = title;
      newTool.description = description;
      newTool.link = link;
      newTool.tags = tagsToInsert;

      await toolsRepository.save(newTool);

      res.status(201).json(tools_view.render(newTool));
    } catch (error) {
      res.status(500).send({ message: `Error trying to save: ${error}.` });
    }

  };

  async deleteTool(req: Request, res: Response) {
    const { id } = req.params;
    const toolsRepository = getRepository(Tool);

    const tool = await toolsRepository.findOne({ id: Number(id) });
    if (!tool) {
      res.status(404).send({ message: "Tool not found" });
      return;
    }

    try {
      await toolsRepository.remove(tool);
      res.status(204).end();
    } catch (error) {
      res.status(404).send({ message: `Error when trying to remove tool ${error}` });
    }
  };

};