import { Entities } from '../../entity-interface';
import { EventBus } from '../../event-bus';
import { Logger } from '../../logger';
import { IdeaInfo } from '../idea';
import { apply } from '../apply-event';

const logger = new Logger('[IdeaView] ->');

// FIXME if read model is down and new events are published... how to load those events, that haven't been processed yet?
export class IdeaView {
  private entities: Entities<IdeaInfo> = {};

  constructor(private eventBus: EventBus) {
    this.eventBus.subscribe('ideas', (event) => {
      this.entities[event.data.id] = apply(this.entities[event.data.id], event);
      logger.debug('updated', this.entities);
    });
  }

  getAllIdea = (): IdeaInfo[] => {
    return Object.keys(this.entities)
      .map((key) => this.entities[key])
      .filter((i) => !i.deleted);
  };

  getIdeaById = (id: string): IdeaInfo => {
    const idea = this.entities[id];
    if (!idea || idea.deleted) {
      throw new Error('idea with id ' + id + ' was not found');
    }
    return idea;
  };
}
