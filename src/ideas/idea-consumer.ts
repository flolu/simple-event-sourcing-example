import { EventBus } from '../event-bus';
import { Logger } from '../logger';

const logger = new Logger('[IdeaConsumer] ->');

export class IdeaConsumer {
  constructor(private eventBus: EventBus) {
    this.init();
  }

  init = () => {
    this.eventBus.subscribe('ideas', (event) => {
      logger.info('consumed event: ', event.type);
    });
  };
}
