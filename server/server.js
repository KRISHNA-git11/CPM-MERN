import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import bidRoutes from './routes/bidRoutes.js'
connectDB();

const port = process.env.PORT || 8800;

const app = express();

// app.use
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}
))
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/bids', bidRoutes);

// error handling middleware
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server up and readt to use!'));
app.listen(port, () => console.log("App listening on port " + port));