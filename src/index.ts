import * as express from 'express';
import * as faker from 'faker';
import { IdeasResource } from './ideas/ideas-resource';
import { EventProducer } from './ideas/event-producer';
import { IdeaCommandService } from './ideas/idea-command-service';
import { EventBus } from './event-bus';
import { IdeaConsumer } from './ideas/idea-consumer';
import { IdeaView } from './ideas/idea-view';
import { Logger } from './logger';

console.clear();
const logger = new Logger('[API] ->');
const app = express();
const eventBus = new EventBus();
const eventProducer = new EventProducer(eventBus);
const commandService = new IdeaCommandService(eventProducer);
const ideasResource = new IdeasResource(commandService, null);
new IdeaConsumer(eventBus);
new IdeaView(eventBus);

app.get('/publish-idea', (_req, res) => {
  logger.info('/publish-idea');
  const response = ideasResource.publishIdea({ title: faker.lorem.words(3), desc: faker.lorem.words(7) });
  res.status(response.status).json(response.body);
});

app.listen(7777);
