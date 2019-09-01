export interface CreateIdeaPayload {
  id: string;
  title: string;
  desc: string;
}

export interface PublicIdeaInfo {
  id: string;
  deleted: boolean;
  version: number;
  lastEventId: string;
}
export interface PrivateIdeaInfo {
  title: string;
  desc: string;
  created: boolean;
}
export interface IdeaInfo extends PublicIdeaInfo, PrivateIdeaInfo {}

export class Idea {
  private id: string = '';
  private title: string = '';
  private desc: string = '';
  private created: boolean = false;
  private deleted: boolean = false;
  private version: number = 0;
  private lastEventId: string = '';

  constructor(ideaInfo?: IdeaInfo) {
    if (ideaInfo) {
      this.id = ideaInfo.id;
      this.title = ideaInfo.title;
      this.desc = ideaInfo.desc;
      this.created = ideaInfo.created || this.created;
      this.deleted = ideaInfo.deleted || this.deleted;
      this.lastEventId = ideaInfo.lastEventId || this.lastEventId;
    }
  }

  getInfo = (): IdeaInfo => ({
    id: this.id,
    title: this.title,
    desc: this.desc,
    created: this.created,
    deleted: this.deleted,
    version: this.version,
    lastEventId: this.lastEventId,
  });
}
