import { EventBus } from '../event-bus';
import { Logger } from '../logger';
import { IdeaCommandService } from './idea-command-service';
import { IdeaEventNames } from './idea-event-names';

const logger = new Logger('[IdeaEventHandler] ->');

export class IdeaEventHandler {
  constructor(private eventBus: EventBus, private ideaService: IdeaCommandService) {
    this.eventBus.subscribe('ideas', (event) => {
      logger.debug('handle', event.type);
      switch (event.type) {
        case IdeaEventNames.CreateRequested: {
          if (Math.random() < 0.9) {
            this.ideaService.acceptIdeaCreation(event.data.id);
          } else {
            this.ideaService.rejectIdeaCreation(event.data.id, 'no no no, you cannot create this idea!');
          }
        }
      }
    });
  }
}
