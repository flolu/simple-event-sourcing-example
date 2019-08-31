import { Entities } from '../entity-interface';
import { EventBus } from '../event-bus';
import { Logger } from '../logger';
import { Idea, IdeaInfo } from './idea';
import { IdeaEventNames } from './events';

const logger = new Logger('[IdeaView] ->');

export class IdeaView {
  private entities: Entities<Idea> = {};

  constructor(private eventBus: EventBus) {
    this.eventBus.subscribe('ideas', (event) => {
      switch (event.type) {
        case IdeaEventNames.CreateRequested: {
          const { id, title, desc } = event.data;
          this.entities[id] = new Idea(id, title, desc);
          break;
        }
        case IdeaEventNames.CreateAccepted: {
          this.entities[event.data.id].acceptCreation();
          break;
        }
        case IdeaEventNames.CreateRejected: {
          this.entities[event.data.id].rejectCreation();
          break;
        }
        case IdeaEventNames.Updated: {
          this.entities[event.data.id].updateIdea(event.data.payload);
          break;
        }
        case IdeaEventNames.Deleted: {
          this.entities[event.data.id].deleteIdea();
          break;
        }
      }
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
