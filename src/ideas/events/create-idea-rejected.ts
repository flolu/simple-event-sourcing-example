import { Ivent } from '../../event';
import { IdeaEventNames } from './idea-event-names';

export class CreateIdeaRejected extends Ivent {
  constructor(ideaId: string, reason: string) {
    super(IdeaEventNames.CreateRejected, { id: ideaId, reason: reason });
  }
}
