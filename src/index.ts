import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';

import ErrorMiddleware from './Middlewares/ErrorMiddleware';
import routes from './Routes/index';

config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);
app.use('/api', routes);
app.use(ErrorMiddleware);

const PORT = process.env.SERVER_PORT;
if (PORT) {
  app.listen(PORT, () => console.log(`Started on port ${PORT}`));
} else {
  console.error('Error: SERVER_PORT is not defined.');
  process.exit(1);
}
