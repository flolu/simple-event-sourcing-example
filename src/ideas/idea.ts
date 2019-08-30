export interface IdeaInfo {
  id: string;
  title: string;
  desc: string;
  created?: boolean;
}

export class Idea {
  private id: string;
  private title: string;
  private desc: string;
  private created: boolean = false;
  constructor(id: string, title: string, desc: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
  }

  acceptCreation = () => (this.created = true);
  rejectCreation = () => (this.created = false);

  getInfo = (): IdeaInfo => ({ id: this.id, title: this.title, desc: this.desc, created: this.created });
}
