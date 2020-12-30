import { createConnection } from 'typeorm';

export const connection = async () => {
  const conn = await createConnection();
  console.log(`Connected to db ${conn.options.database}`);
  
  process.on('SIGINT', () => {
    conn.close().then(() => console.log('bd v4-app done'));
  });
};