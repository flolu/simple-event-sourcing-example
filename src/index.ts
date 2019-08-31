import * as express from 'express';

import { IdeasApi } from './ideas/ideas-api';
import { EventProducer } from './ideas/event-producer';
import { IdeaCommandHandler } from './ideas/idea-command-handler';
import { EventBus } from './event-bus';
import { IdeaView } from './ideas/query/idea-view';
import { Logger } from './logger';
import { IdeaEventHandler } from './ideas/idea-event-handler';
import { EventStore } from './event-store';

const logger = new Logger('[API] ->');
const app = express();
const eventBus = new EventBus();
const eventProducer = new EventProducer(eventBus);
const eventStore = new EventStore(eventProducer);
const ideaView = new IdeaView(eventBus);
const commandHandler = new IdeaCommandHandler(eventStore);

const ideasApi = new IdeasApi(commandHandler, ideaView);
new IdeaEventHandler(eventBus, commandHandler);

const expressCallback = (controller: Function) => {
  return (req: express.Request, res: express.Response) => {
    logger.debug(req.path, req.param);
    const response = controller({ body: req.body, params: req.params });
    return res.status(response.status).send(response.body);
  };
};

app.get('/ideas/publish', expressCallback(ideasApi.publishIdea));
app.get('/ideas/update/:id', expressCallback(ideasApi.editIdea));
app.get('/ideas/delete/:id', expressCallback(ideasApi.deleteIdea));

app.get('/ideas', expressCallback(ideasApi.getIdeas));
app.get('/ideas/:id', expressCallback(ideasApi.getIdeaById));

app.get('/events/:id', async (req, res) => {
  const stream = eventStore.getStream(req.params.id);
  res.send(stream);
});
app.get('/aggregate/:id', async (req, res) => {
  const idea = await commandHandler.getLatestStateOfIdea(req.params.id);
  res.send(idea);
});

app.listen(3333);
