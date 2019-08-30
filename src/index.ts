import * as express from 'express';
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

const expressCallback = (controller: Function) => {
  return (req: express.Request, res: express.Response) => {
    logger.debug(req.path, req.param);
    const response = controller({ body: req.body, params: req.params });
    res.status(response.status).send(response.body);
  };
};

app.get('/ideas/publish', expressCallback(ideasResource.publishIdea));
app.get('/ideas/update/:id', expressCallback(ideasResource.editIdea));
app.get('/ideas/delete/:id', expressCallback(ideasResource.deleteIdea));

app.get('/ideas', expressCallback(ideasResource.getIdeas));
app.get('/ideas/:id', expressCallback(ideasResource.getIdeaById));

app.listen(7777);
