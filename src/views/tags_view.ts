import Tag from "../models/Tag";

// renders a view to display each tag
export default {
  render(tags: Tag[]) {
    return tags.map(tag => tag.name);
  }
};