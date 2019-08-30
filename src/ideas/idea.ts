export interface IdeaInfo {
  id: string;
  title: string;
  desc: string;
  created?: boolean;
  deleted?: boolean;
}

export class Idea {
  private id: string;
  private title: string;
  private desc: string;
  private created: boolean = false;
  private deleted: boolean = false;
  constructor(id: string, title: string, desc: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
  }

  acceptCreation = () => (this.created = true);
  rejectCreation = () => (this.created = false);
  updateIdea = ({ title, desc }: Partial<IdeaInfo>) => {
    this.title = title || this.title;
    this.desc = desc || this.desc;
  };
  deleteIdea = () => (this.deleted = true);

  getInfo = (): IdeaInfo => ({
    id: this.id,
    title: this.title,
    desc: this.desc,
    created: this.created,
    deleted: this.deleted,
  });
}
