import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connection } from './config/db';
import toolsRoute from './routes/tools';
import usersRoute from './routes/users';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

connection();

app.use('/tools', toolsRoute);
app.use('/users', usersRoute);

app.use('/', (_req, res) => {
  res.send('This is v4 API');
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  server.close();
  console.log(' xx App is finished xx ');
});