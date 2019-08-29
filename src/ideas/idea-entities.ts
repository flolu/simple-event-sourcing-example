import { IdeaInfo } from './idea-info';
import { Ivent } from '../event';

export interface Idea {
  id: string;
  title: string;
  desc: string;
}

export class IdeaEvent extends Ivent {
  constructor(type: string, data: any) {
    super(type, data);
  }
}

export class CreateIdeaRequested extends IdeaEvent {
  private ideaInfo: IdeaInfo;

  constructor(ideaInfo: IdeaInfo) {
    super('CreateIdeaRequested', ideaInfo.get());
    this.ideaInfo = ideaInfo;
  }

  getIdeaInfo = () => this.ideaInfo;
}
