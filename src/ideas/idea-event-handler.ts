import { EventBus } from '../event-bus';
import { Logger } from '../logger';
import { IdeaCommandService } from './idea-command-service';
import { IdeaEventNames } from './events';

const logger = new Logger('[IdeaEventHandler] ->');

export class IdeaEventHandler {
  constructor(private eventBus: EventBus, private commandService: IdeaCommandService) {
    this.eventBus.subscribe('ideas', (event) => {
      logger.debug('handle', event.type);
      switch (event.type) {
        case IdeaEventNames.CreateRequested: {
          if (Math.random() < 0.9) {
            this.commandService.acceptIdeaCreation(event.data.id);
          } else {
          }
        }
      }
    });
  }
}
