import Tool from '../models/Tool';
import tags_view from './tags_view';

export default {
  render(tool: Tool) {
    return {
      id: tool.id,
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tags_view.render(tool.tags)
    };
  },

  renderMany(tools: Tool[]) {
    return tools.map(tool => this.render(tool));
  }
}