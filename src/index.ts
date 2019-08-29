import * as express from 'express';
import * as faker from 'faker';
import { IdeasResource } from './ideas/ideas-resource';
import { EventProducer } from './ideas/event-producer';
import { IdeaCommandService } from './ideas/idea-command-service';
import { EventBus } from './event-bus';
import { IdeaConsumer } from './ideas/idea-consumer';

console.clear();
const app = express();
const eventBus = new EventBus();
const eventProducer = new EventProducer(eventBus);
const commandService = new IdeaCommandService(eventProducer);
const ideasResource = new IdeasResource(commandService, null);
new IdeaConsumer(eventBus);

app.get('/publish-idea', (_req, res) => {
  const response = ideasResource.publishIdea({ title: faker.lorem.words(), desc: faker.lorem.paragraph() });
  res.status(response.status).json(response.body);
});

app.listen(7777);
