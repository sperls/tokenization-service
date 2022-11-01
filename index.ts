import express, { Express } from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import tokensRouter from './routes/tokens';
import { authenticateToken, notFound } from './utils/middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false, limit: '1kb' }));
app.use(bodyParser.json({ type: 'application/json', limit: '1kb' }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(authenticateToken);

app.use('/tokens', tokensRouter);
app.use(notFound);

https
  .createServer({ key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') }, app)
  .listen(port, () => {
    console.log(`Server is running at https://localhost:${port}`);
  });
