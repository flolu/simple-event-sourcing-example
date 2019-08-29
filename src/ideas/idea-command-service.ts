import { IdeaInfo } from './idea-info';
import { CreateIdeaRequested } from './idea-entities';
import { EventProducer } from './event-producer';

export class IdeaCommandService {
  constructor(private eventProducer: EventProducer) {}

  requestToCreateIdea = (ideaInfo: IdeaInfo) => {
    this.eventProducer.publish(new CreateIdeaRequested(ideaInfo));
  };
}
