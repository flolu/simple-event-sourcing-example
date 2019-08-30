import { Logger } from '../logger';
import { EventProducer } from './event-producer';
import { CreateIdeaRequested, CreateIdeaAccepted, CreateIdeaRejected, IdeaDeleted, IdeaUpdated } from './events';
import { IdeaInfo } from './idea';
import { IdeaView } from './idea-view';

const logger = new Logger('[IdeaCommandService] ->');

export class IdeaCommandService {
  constructor(private eventProducer: EventProducer, private queryService: IdeaView) {}

  requestToCreateIdea = (ideaInfo: IdeaInfo): void => {
    logger.debug('request to create idea');
    this.eventProducer.publish(new CreateIdeaRequested(ideaInfo));
  };

  editIdea = (id: string, payload: Partial<IdeaInfo>): void => {
    logger.debug('edit idea', id);
    this.eventProducer.publish(new IdeaUpdated(id, payload));
  };

  deleteIdea = (id: string): void => {
    logger.debug('delete idea', id);
    this.eventProducer.publish(new IdeaDeleted(id));
  };

  acceptIdeaCreation = (id: string): void => {
    logger.debug('accept to create idea', id);
    // TODO get idea from event store, not from read side!
    const idea: IdeaInfo = this.queryService.getIdeaById(id);
    this.eventProducer.publish(new CreateIdeaAccepted(idea));
  };

  rejectIdeaCreation = (id: string, reason: string): void => {
    logger.debug('rejected to create idea', id);
    this.eventProducer.publish(new CreateIdeaRejected(id, reason));
  };
}
