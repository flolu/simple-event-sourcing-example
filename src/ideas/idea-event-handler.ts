import { EventBus } from '../event-bus';
import { Logger } from '../logger';
import { IdeaCommandHandler } from './idea-command-handler';
import { IdeaEventNames } from './events';

const logger = new Logger('[IdeaEventHandler] ->');

export class IdeaEventHandler {
  constructor(private eventBus: EventBus, private commandHandler: IdeaCommandHandler) {
    this.eventBus.subscribe('ideas', (event) => {
      logger.debug('handle', event.type);
      switch (event.type) {
        case IdeaEventNames.CreateRequested: {
          if (Math.random() < 0.9) {
            this.commandHandler.acceptIdeaCreation(event.data.id);
          } else {
            this.commandHandler.rejectIdeaCreation(event.data.id, 'no no no you can not create this idea!');
          }
        }
      }
    });
  }
}
