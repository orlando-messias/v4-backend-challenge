// Verify if link starts with 'http://' or 'https://' and is at least 12 characters long
function validateLink(link: string) {
  const validLink = /^(?:http(s)?:\/\/)/
  if (!validLink.test(link) || link.length < 12) return false;
  return true;
};

export default validateLink;