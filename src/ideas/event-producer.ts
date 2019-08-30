import { Ivent } from '../event';
import { EventBus } from '../event-bus';

import { Logger } from '../logger';

const logger = new Logger('[EventProducer] ->');

export class EventProducer {
  constructor(private eventBus: EventBus) {}

  publish = (...events: Ivent[]) => {
    logger.info('publish event');
    for (const event of events) {
      this.eventBus.publish('ideas', event);
    }
  };
}
