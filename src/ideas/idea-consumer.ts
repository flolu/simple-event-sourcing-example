import { EventBus } from '../event-bus';

export class IdeaConsumer {
  constructor(private eventBus: EventBus) {
    this.init();
  }

  init = () => {
    this.eventBus.subscribe('ideas', (event) => {
      console.log('got event in ideas topic', event);
    });
  };
}
