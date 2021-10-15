/* eslint-disable max-len */
import dotenv from 'dotenv';

dotenv.config();

const config = {
  MONGODB_DATABASE: process.env.DB_URL_Live,
  DB_TEST: process.env.DB_URL_TEST,
  secretOrKey: process.env.TOKEN_SECRET,
};

export default config;
