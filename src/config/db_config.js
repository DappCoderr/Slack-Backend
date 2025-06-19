import mongoose from 'mongoose';

import { DEV_DB_URL, NODE_ENV, PRO_DB_URL } from './server_config.js';

export const connectDB = async () => {
  try {
    if (NODE_ENV === 'development') {
      await mongoose.connect(DEV_DB_URL);
    } else if (NODE_ENV === 'production') {
      await mongoose.connect(PRO_DB_URL);
    }
    console.log(`connected to MongoDB from ${NODE_ENV} environment`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};
