import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import bidRoutes from './routes/bidRoutes.js'
import companyProfileRoutes from './routes/companyProfileRoutes.js'
import companyemployeeRoutes from './routes/companyemployeeroutes.js'
import bidPostingRoutes from './routes/bidPostingRoutes.js'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const port = process.env.PORT || 8800;

const app = express();

// app.use
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}
))
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/companyProfile', companyProfileRoutes)
app.use('/api/companyEmployee', companyemployeeRoutes)
app.use("/api/postings", bidPostingRoutes)
app.use('/files', express.static(path.join(__dirname, 'files')));

// error handling middleware
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Server up and readt to use!'));
app.listen(port, () => console.log("App listening on port " + port));