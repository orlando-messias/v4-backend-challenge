export default class ToolsServices {

  // Verifies if link starts with 'http://' or 'https://' and if it contains at least one dot character
  validateLink(link: string): boolean {
    const validLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)/
    if (!validLink.test(link)) return false;
    return true;
  };
}
