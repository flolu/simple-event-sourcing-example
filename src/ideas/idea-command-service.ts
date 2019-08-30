import { IdeaInfo } from './idea-info';
import { CreateIdeaRequested } from './idea-entities';
import { EventProducer } from './event-producer';

import { Logger } from '../logger';

const logger = new Logger('[IdeaCommandService] ->');

export class IdeaCommandService {
  constructor(private eventProducer: EventProducer) {}

  requestToCreateIdea = (ideaInfo: IdeaInfo) => {
    logger.info('request to create idea');
    this.eventProducer.publish(new CreateIdeaRequested(ideaInfo));
  };
}
