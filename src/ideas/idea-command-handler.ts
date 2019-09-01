import { EventStore } from '../event-store';
import { Logger } from '../logger';
import { CreateIdeaAccepted, CreateIdeaRejected, CreateIdeaRequested, IdeaDeleted, IdeaUpdated } from './events';
import { CreateIdeaPayload, IdeaInfo } from './idea';
import { IdeaTombstone } from './events/idea-tombstone';

const logger = new Logger('[IdeaCommandService] ->');

export class IdeaCommandHandler {
  constructor(private eventStore: EventStore) {}

  requestToCreateIdea = (ideaInfo: CreateIdeaPayload): void => {
    logger.debug('request to create idea');
    const event = new CreateIdeaRequested(ideaInfo);
    this.eventStore.createStream(ideaInfo.id, event);
  };

  editIdea = (id: string, payload: Partial<IdeaInfo>): void => {
    logger.debug('edit idea', id);
    const idea = this.eventStore.getCurrentAggregate(id);
    const event = new IdeaUpdated(id, payload);
    this.eventStore.addEvent(id, event, idea.lastEventId);
  };

  deleteIdea = (id: string): void => {
    logger.debug('delete idea', id);
    const idea = this.eventStore.getCurrentAggregate(id);
    if (!idea) {
      throw new Error('cannot delete idea with id: ' + id + ' (it does not exist)');
    }
    if (idea.deleted) {
      throw new Error('the idea with the id: ' + id + ' has already been deleted');
    }
    const event = new IdeaDeleted(id);
    this.eventStore.addEvent(id, event, idea.lastEventId);
  };

  acceptIdeaCreation = async (id: string) => {
    logger.debug('accept to create idea', id);
    const idea = this.eventStore.getCurrentAggregate(id);
    const event = new CreateIdeaAccepted(idea);
    this.eventStore.addEvent(id, event, idea.lastEventId);
  };

  rejectIdeaCreation = (id: string, reason: string): void => {
    logger.debug('rejected to create idea', id);
    const idea = this.eventStore.getCurrentAggregate(id);
    const event = new CreateIdeaRejected(id, reason);
    this.eventStore.addEvent(id, event, idea.lastEventId);
  };

  forgetIdea = (id: string): void => {
    logger.debug('forget idea', id);
    const idea = this.eventStore.getCurrentAggregate(id);
    if (!idea) {
      throw new Error('cannot forget idea with id: ' + id + ' (it does not exist)');
    }
    const event = new IdeaTombstone(id);
    this.eventStore.clearStream(id, event, idea.lastEventId);
  };
}
