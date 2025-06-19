import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { connectDB } from './config/db_config.js';
import { PORT } from './config/server_config.js';
import apiRouter from './router/apiRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Hello, World!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
