// Verify if link starts with 'http://' or 'https://' and if it contains at least one dot character
function validateLink(link: string) {
  const validLink = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)/
  if (!validLink.test(link)) return false;
  return true;
};

export default validateLink;