import { Request, Response } from 'express';
import { getRepository, ILike } from 'typeorm';
import { validate } from 'class-validator';
import { Like } from 'typeorm';

import Tool from '../models/Tool';
import Tag from '../models/Tag';
import tools_view from '../views/tools_view';
import ToolsServices from '../services/ToolsServices';

export default class ToolController {

  // list all tools by title or tag name
  async getAll(req: Request, res: Response) {
    const toolsRepository = getRepository(Tool);
    const { tag, title } = req.query;

    // find tools by tag if a query param 'tag' exists  
    if (tag) {
      const tagsRepository = getRepository(Tag);

      const tools = await tagsRepository.find({
        relations: ['tool'],
        where: { name: Like(`${tag}%`) },
      });

      const newTools = tools.map(item => item.tool);
      return res.status(200).json(tools_view.renderMany(newTools));
    }

    // find tools by title if a query param 'title' exists
    if (title) {
      const tools = await toolsRepository.find({
        relations: ['tags'],
        where: { title: ILike(`${title}%`) },
      });

      return res.status(200).json(tools_view.renderMany(tools));
    }

    const tools = await toolsRepository.find({
      relations: ['tags'],
    });

    return res.status(200).json(tools_view.renderMany(tools));
  };

  // find a tool by id
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

  // save a tool and its related tags
  async saveTool(req: Request, res: Response) {
    const { title, link, description, tags } = req.body;
    const toolsServices = new ToolsServices();

    if (!title || !link || !description || !tags) {
      return res.status(400).json({ message: 'Missing entries. Try again.' });
    }

    // validate if link is a valid link
    if (!toolsServices.validateLink(link)) {
      return res.status(400).json({ message: 'Invalid link entry' });
    }

    const toolsRepository = getRepository(Tool);
    const tagsRepository = getRepository(Tag);

    // validate characters length of link and description 
    const isValidLength = toolsRepository.create({
      link,
      description
    });
    const errors = await validate(isValidLength);
    if (errors.length !== 0) {
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

  // delete a tool by id
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