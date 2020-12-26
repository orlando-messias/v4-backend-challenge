export default class UsersServices {
  
  // Check if email is a valid email
  validateEmail(email: string): boolean {
    const validEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!validEmail.test(email)) return false;
    return true;
  };
  
  // Check if password contains only letters and numbers
  validatePassword(password: string): boolean {
    const validPassword = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
    if (!validPassword.test(password) || password.length < 6) return false;
    return true;
  };

};

