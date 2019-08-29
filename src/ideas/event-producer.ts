import { Ivent } from './idea-entities';
import { EventBus } from '../event-bus';

export class EventProducer {
  constructor(private eventBus: EventBus) {}

  publish = (...events: Ivent[]) => {
    for (const event of events) {
      this.eventBus.publish('ideas', event);
    }
  };
}
