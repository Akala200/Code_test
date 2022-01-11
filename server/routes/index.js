import express from 'express';
import dataRoutes from './data';


const app = express();

app.use('/error', dataRoutes);

export default app;
