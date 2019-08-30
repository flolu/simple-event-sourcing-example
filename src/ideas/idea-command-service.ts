import { IdeaInfo } from './idea-info';
import { CreateIdeaRequested, CreateIdeaRejected, CreateIdeaAccepted, Idea } from './idea-entities';
import { EventProducer } from './event-producer';

import { Logger } from '../logger';
import { IdeaView } from './idea-view';

const logger = new Logger('[IdeaCommandService] ->');

export class IdeaCommandService {
  constructor(private eventProducer: EventProducer, private queryService: IdeaView) {}

  requestToCreateIdea = (ideaInfo: IdeaInfo) => {
    logger.debug('request to create idea');
    this.eventProducer.publish(new CreateIdeaRequested(ideaInfo));
  };

  acceptIdeaCreation = (id: string) => {
    logger.debug('accept to create idea', id);
    // TODO get idea from event store, not from read side!
    const idea: Idea = this.queryService.getIdeaById(id);
    this.eventProducer.publish(new CreateIdeaAccepted(idea));
  };

  rejectIdeaCreation = (id: string, reason: string) => {
    logger.debug('rejected to create idea', id);
    this.eventProducer.publish(new CreateIdeaRejected(id, reason));
  };
}
