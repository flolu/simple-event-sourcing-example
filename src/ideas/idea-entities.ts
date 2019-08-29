import { IdeaInfo } from './idea-info';

export class Ivent {
  private timestamp: number;
  private type: string;
  private data: string;

  constructor(type: string, data: any) {
    this.timestamp = Date.now();
    this.type = type;
    this.data = data;
  }

  getTimestamp = () => this.timestamp;
  getType = () => this.type;
  getData = () => this.data;
  get = () => ({ timestamp: this.timestamp, type: this.type, data: this.data });
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
