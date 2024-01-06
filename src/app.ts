import express from 'express';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import logger from './services/logger';
import container from './containers/inversify.config';
import AuthMiddleware from './middleware/AuthMiddleware';

dotenv.config();

// Configure Express to use the Inversify container
const server = new InversifyExpressServer(container, null, { rootPath: '/' });
server.setConfig((app) => {
  app.use(express.json());
  app.use(container.get<AuthMiddleware>(AuthMiddleware).verifyToken);
});

const app = server.build();

// Set up the server to listen on a specific port
const port = process.env.PORT;
if (!port) {
  logger.error('Port number not defined in environment variables');
  process.exit(1);
}

app.listen(port, () => {
  logger.info(`Server is running at port ${port}`);
});
