export interface CreateIdeaPayload {
  id: string;
  title: string;
  desc: string;
}

export interface IdeaInfo {
  id: string;
  title: string;
  desc: string;
  created: boolean;
  deleted: boolean;
}

export class Idea {
  private id: string = '';
  private title: string = '';
  private desc: string = '';
  private created: boolean = false;
  private deleted: boolean = false;

  constructor(ideaInfo?: IdeaInfo) {
    if (ideaInfo) {
      this.id = ideaInfo.id;
      this.title = ideaInfo.title;
      this.desc = ideaInfo.desc;
      this.created = ideaInfo.created || this.created;
      this.deleted = ideaInfo.deleted || this.deleted;
    }
  }

  getInfo = (): IdeaInfo => ({
    id: this.id,
    title: this.title,
    desc: this.desc,
    created: this.created,
    deleted: this.deleted,
  });
}
