export class IdeaInfo {
  private id: string;
  private title: string;
  private desc: string;
  private created: boolean;

  constructor(id: string, title: string, desc: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.created = false;
  }

  get = () => ({ id: this.id, title: this.title, desc: this.desc, created: this.created });
}
