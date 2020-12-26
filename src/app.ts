import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connection } from './config/db';
import toolsRoute from './routes/tools';

export const app = express();

app.use(cors());
app.use(bodyParser.json());

connection();

app.use('/tools', toolsRoute);

app.use('/', (_req, res) => {
  res.send('This is v4 API');
});
