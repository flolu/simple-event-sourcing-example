import * as express from 'express';
import * as faker from 'faker';
import { IdeasResource } from './ideas/ideas-resource';
import { EventProducer } from './ideas/event-producer';
import { IdeaCommandService } from './ideas/idea-command-service';
import { EventBus } from './event-bus';
import { IdeaView } from './ideas/idea-view';
import { Logger } from './logger';
import { IdeaEventHandler } from './ideas/idea-event-handler';

console.clear();
const logger = new Logger('[API] ->');
const app = express();
const eventBus = new EventBus();
const eventProducer = new EventProducer(eventBus);
const ideaView = new IdeaView(eventBus);
const commandService = new IdeaCommandService(eventProducer, ideaView);
const ideasResource = new IdeasResource(commandService, ideaView);
new IdeaEventHandler(eventBus, commandService);

// TODO abstraction

app.get('/ideas/publish', (_req, res) => {
  logger.debug('publish idea');
  const response = ideasResource.publishIdea({ title: faker.lorem.words(3), desc: faker.lorem.words(7) });
  res.status(response.status).json(response.body);
});

app.get('/ideas/update/:id', (req, res) => {
  logger.debug('update idea');
  const response = ideasResource.editIdea(req.params.id, { title: faker.lorem.words(3), desc: faker.lorem.words(7) });
  res.status(response.status).json(response.body);
});

app.get('/ideas/delete/:id', (req, res) => {
  logger.debug('delete idea');
  const response = ideasResource.deleteIdea(req.params.id);
  res.status(response.status).json(response.body);
});

app.get('/ideas', (_req, res) => {
  logger.debug('get ideas');
  const response = ideasResource.getIdeas();
  res.status(response.status).json(response.body);
});

app.get('/ideas/:id', (req, res) => {
  logger.debug('get one idea');
  const response = ideasResource.getIdeaById(req.params.id);
  res.status(response.status).json(response.body);
});

app.listen(7777);
