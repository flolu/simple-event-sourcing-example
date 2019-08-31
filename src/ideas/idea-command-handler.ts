import { Logger } from '../logger';
import { CreateIdeaRequested, CreateIdeaAccepted, CreateIdeaRejected, IdeaDeleted, IdeaUpdated } from './events';
import { IdeaInfo, Idea, CreateIdeaPayload } from './idea';
import { EventStore } from '../event-store';
import { replay } from './replay-events';

const logger = new Logger('[IdeaCommandService] ->');

export class IdeaCommandHandler {
  constructor(private eventStore: EventStore) {}

  requestToCreateIdea = (ideaInfo: CreateIdeaPayload): void => {
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

  acceptIdeaCreation = async (id: string) => {
    logger.debug('accept to create idea', id);
    const idea = await this.getLatestStateOfIdea(id);
    const event = new CreateIdeaAccepted(idea);
    this.eventStore.addEvent(id, event);
  };

  rejectIdeaCreation = (id: string, reason: string): void => {
    logger.debug('rejected to create idea', id);
    const event = new CreateIdeaRejected(id, reason);
    this.eventStore.addEvent(id, event);
  };

  // TODO move this to a better place
  // TODO snapshots?
  getLatestStateOfIdea = async (ideaId: string): Promise<IdeaInfo> => {
    const stream = this.eventStore.getStream(ideaId);
    return replay(new Idea().getInfo(), stream);
  };
}
