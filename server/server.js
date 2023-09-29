import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'

connectDB();

const port = process.env.PORT || 8800;

const app = express();

// app.use
app.use('/api/users', userRoutes);

// error handling middleware
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server up and readt to use!'));
app.listen(port, () => console.log("App listening on port " + port));