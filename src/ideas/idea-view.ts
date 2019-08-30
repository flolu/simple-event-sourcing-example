import { Idea } from './idea-entities';
import { EventBus } from '../event-bus';
import { Logger } from '../logger';

const logger = new Logger('[IdeaView] ->');

export class IdeaView {
  private ideas: Idea[] = [];

  constructor(private eventBus: EventBus) {
    this.init();
  }

  private init = () => {
    this.eventBus.subscribe('ideas', (event) => {
      switch (event.type) {
        case 'CreateIdeaRequested': {
          this.ideas = [...this.ideas, event.data];
        }
      }
      logger.info('changed to', this.ideas);
    });
  };
}
