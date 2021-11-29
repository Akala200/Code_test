import express from 'express';
import dataRoutes from './data';


const app = express();

app.use('/data', dataRoutes);

export default app;
