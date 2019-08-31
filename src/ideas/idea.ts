import { IdeaEventNames } from './events';
import { EventData } from '../event';

export interface IdeaInfo {
  id: string;
  title: string;
  desc: string;
  created?: boolean;
  deleted?: boolean;
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

  reduce = (event: EventData) => {
    switch (event.type) {
      case IdeaEventNames.CreateRequested: {
        const { id, title, desc } = event.data;
        this.createIdea(id, title, desc);
        break;
      }
      case IdeaEventNames.CreateAccepted: {
        this.acceptCreation();
        break;
      }
      case IdeaEventNames.CreateRejected: {
        this.rejectCreation();
        break;
      }
      case IdeaEventNames.Updated: {
        this.updateIdea(event.data.payload);
        break;
      }
      case IdeaEventNames.Deleted: {
        this.deleteIdea();
        break;
      }
    }
  };

  getInfo = (): IdeaInfo => ({
    id: this.id,
    title: this.title,
    desc: this.desc,
    created: this.created,
    deleted: this.deleted,
  });

  private acceptCreation = () => (this.created = true);
  private rejectCreation = () => (this.created = false);
  private createIdea = (id: string, title: string, desc: string) => {
    this.id = id;
    this.title = title;
    this.desc = desc;
  };
  private updateIdea = ({ title, desc }: Partial<IdeaInfo>) => {
    this.title = title || this.title;
    this.desc = desc || this.desc;
  };
  private deleteIdea = () => (this.deleted = true);
}
