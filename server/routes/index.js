import express from 'express';
import userRoutes from './user';
import productRoutes from './product';
import transactionRoutes from './transaction';


const app = express();

app.use('/user/', userRoutes);
app.use('/product/', productRoutes);
app.use('/transaction/', transactionRoutes);


export default app;
