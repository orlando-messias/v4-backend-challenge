import Tag from "../models/Tag";

export default {
  render(tags: Tag[]) {
    return tags.map(tag => tag.name);
  }
};