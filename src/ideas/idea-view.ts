import { Idea } from './idea-entities';
import { EventBus } from '../event-bus';

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
      console.log('idea view changed to:');
      console.log(this.ideas);
    });
  };
}
