import { Entities } from '../entity-interface';
import { EventBus } from '../event-bus';
import { Logger } from '../logger';
import { Idea, IdeaInfo } from './idea';

const logger = new Logger('[IdeaView] ->');

export class IdeaView {
  private entities: Entities<Idea> = {};

  constructor(private eventBus: EventBus) {
    this.eventBus.subscribe('ideas', (event) => {
      if (!this.entities[event.data.id]) {
        this.entities[event.data.id] = new Idea();
      }
      this.entities[event.data.id].reduce(event);
      logger.debug('updated', this.entities);
    });
  }

  getAllIdea = (): IdeaInfo[] => {
    return Object.keys(this.entities)
      .map((key) => this.entities[key].getInfo())
      .filter((i) => !i.deleted);
  };

  getIdeaById = (id: string): IdeaInfo => {
    const idea: Idea = this.entities[id];
    if (!idea || idea.getInfo().deleted) {
      throw new Error('idea with id ' + id + ' was not found');
    }
    return idea.getInfo();
  };
}
