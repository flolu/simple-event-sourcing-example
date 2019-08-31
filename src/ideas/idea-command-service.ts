import { Logger } from '../logger';
import { CreateIdeaRequested, CreateIdeaAccepted, CreateIdeaRejected, IdeaDeleted, IdeaUpdated } from './events';
import { IdeaInfo } from './idea';
import { IdeaView } from './idea-view';
import { EventStore } from '../event-store';

const logger = new Logger('[IdeaCommandService] ->');

export class IdeaCommandService {
  constructor(private queryService: IdeaView, private eventStore: EventStore) {}

  requestToCreateIdea = (ideaInfo: IdeaInfo): void => {
    logger.debug('request to create idea');
    const event = new CreateIdeaRequested(ideaInfo);
    this.eventStore.addEvent(ideaInfo.id, event);
  };

  editIdea = (id: string, payload: Partial<IdeaInfo>): void => {
    logger.debug('edit idea', id);
    const event = new IdeaUpdated(id, payload);
    this.eventStore.addEvent(id, event);
  };

  deleteIdea = (id: string): void => {
    logger.debug('delete idea', id);
    const event = new IdeaDeleted(id);
    this.eventStore.addEvent(id, event);
  };

  acceptIdeaCreation = (id: string): void => {
    logger.debug('accept to create idea', id);
    // TODO get idea from event store, not from read side!
    const idea: IdeaInfo = this.queryService.getIdeaById(id);
    const event = new CreateIdeaAccepted(idea);
    this.eventStore.addEvent(id, event);
  };

  rejectIdeaCreation = (id: string, reason: string): void => {
    logger.debug('rejected to create idea', id);
    const event = new CreateIdeaRejected(id, reason);
    this.eventStore.addEvent(id, event);
  };
}
