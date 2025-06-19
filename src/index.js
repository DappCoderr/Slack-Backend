import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { connectDB } from './config/db_config.js';
import { PORT } from './config/server_config.js';

const app = express();

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
