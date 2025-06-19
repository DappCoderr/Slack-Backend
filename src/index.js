import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Hello, World!'
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
