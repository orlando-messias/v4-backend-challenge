import { sign } from 'jsonwebtoken';

import jwtConfig from '../config/jwtConfig';

interface credentials {
  email: string,
  password: string,
}

export const authenticate = (payload: credentials) => {
  const token = sign({ payload }, jwtConfig.secret, jwtConfig.headers);
  return token;
};