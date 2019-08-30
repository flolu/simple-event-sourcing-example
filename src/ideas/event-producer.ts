import { Ivent } from '../event';
import { EventBus } from '../event-bus';

import { Logger } from '../logger';

const logger = new Logger('[EventProducer] ->');
const eventLogger = new Logger('🐥');

export class EventProducer {
  constructor(private eventBus: EventBus) {}

  publish = (...events: Ivent[]) => {
    for (const event of events) {
      logger.debug('publish event');
      eventLogger.info(event.getType());
      this.eventBus.publish('ideas', event);
    }
  };
}
