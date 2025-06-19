import express from 'express';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Message retrieved successfully'
  });
});

export default router;
