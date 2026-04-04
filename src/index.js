import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';

import { bullServerAdapter } from './config/bullBoard_config.js';
import { connectDB } from './config/db_config.js';
import { PORT } from './config/server_config.js';
import { verifyEmailController } from './controller/userController.js';
import apiRouter from './router/apiRouter.js';

// app initialization
const app = express();

// app middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app bull board
app.use('/ui', bullServerAdapter.getRouter());

// app routing
app.use('/api', apiRouter);

app.get('/verify/:token', verifyEmailController);

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
