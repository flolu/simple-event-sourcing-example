import { IdeaInfo } from './idea-info';
import { Ivent } from '../event';
import { IdeaEventNames } from './idea-event-names';

export interface Idea {
  id: string;
  title: string;
  desc: string;
  created: boolean;
}

export class IdeaEvent extends Ivent {
  constructor(type: string, data: any) {
    super(type, data);
  }
}

export class CreateIdeaRequested extends IdeaEvent {
  private ideaInfo: IdeaInfo;

  constructor(ideaInfo: IdeaInfo) {
    super(IdeaEventNames.CreateRequested, ideaInfo.get());
    this.ideaInfo = ideaInfo;
  }

  getIdeaInfo = () => this.ideaInfo;
}

export class CreateIdeaAccepted extends IdeaEvent {
  constructor(idea: Idea) {
    super(IdeaEventNames.CreateAccepted, idea);
  }
}

export class CreateIdeaRejected extends IdeaEvent {
  private ideaId: string;
  private reason: string;

  constructor(ideaId: string, reason: string) {
    super(IdeaEventNames.CreateRejected, { ideaId: ideaId, reason: reason });
    this.ideaId = ideaId;
    this.reason = reason;
  }

  getRejectionInfo = () => ({ ideaId: this.ideaId, reason: this.reason });
}
