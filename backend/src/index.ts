import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import api from './api/api';

// point to the .env file in the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// create the express app
const app = express();

// HTTP request logger
app.use(morgan('dev'));
// HTTP header security
app.use(helmet());
// body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());
// Cross-origin resource sharing
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);
// set up session the application session
app.use(
  session({
    name: 'thriftio-session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60, sameSite: false, secure: false },
  })
);

// use the api router
app.use('/api', api);

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
