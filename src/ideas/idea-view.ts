import { Idea } from './idea-entities';
import { EventBus } from '../event-bus';
import { Logger } from '../logger';
import { IdeaEventNames } from './idea-event-names';
import { Entities } from '../entity-interface';

const logger = new Logger('[IdeaView] ->');

export class IdeaView {
  private entities: Entities<Idea> = {};

  constructor(private eventBus: EventBus) {
    this.eventBus.subscribe('ideas', (event) => {
      switch (event.type) {
        case IdeaEventNames.CreateRequested: {
          this.entities[event.data.id] = { ...event.data };
          break;
        }
        case IdeaEventNames.CreateAccepted: {
          this.entities[event.data.id] = { ...this.entities[event.data.id], created: true };
          break;
        }
        case IdeaEventNames.CreateRejected: {
          this.entities[event.data.id] = { ...this.entities[event.data.id], created: false };
          break;
        }
      }
      logger.debug('updated');
    });
  }

  getAllIdea = (): Entities<Idea> => {
    return this.entities;
  };

  getIdeaById = (id: string): Idea => {
    return this.entities[id] || {};
  };
}
