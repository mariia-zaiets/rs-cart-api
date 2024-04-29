import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverless from 'aws-serverless-express';
import * as helmet from 'helmet';

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  app.use(helmet());
  app.enableCors();
  await app.init();
  return app;
}

let cachedServer;
async function bootstrapServer(): Promise<any> {
  if (!cachedServer) {
    const app = await bootstrap();
    cachedServer = serverless.createServer(expressApp);
  }
  return cachedServer;
}

export const handler = async (event, context) => {
  cachedServer = await bootstrapServer();
  return serverless.proxy(cachedServer, event, context, 'PROMISE').promise;
};
