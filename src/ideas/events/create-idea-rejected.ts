import { Ivent } from '../../event';
import { IdeaEventNames } from './idea-event-names';

export class CreateIdeaRejected extends Ivent {
  private id: string;
  private reason: string;

  constructor(ideaId: string, reason: string) {
    super(IdeaEventNames.CreateRejected, { id: ideaId, reason: reason });
    this.id = ideaId;
    this.reason = reason;
  }

  getRejectionInfo = () => ({ id: this.id, reason: this.reason });
}
