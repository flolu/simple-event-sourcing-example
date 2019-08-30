import * as shortid from 'shortid';
import { IdeaInfo } from './idea-info';
import { IdeaCommandService } from './idea-command-service';
import { Logger } from '../logger';

const logger = new Logger('[IdeasResource] ->');

export class IdeasResource {
  constructor(private commandService: IdeaCommandService, private queryService: any) {
    this.queryService;
  }

  public publishIdea = ({ title, desc }: { title: string; desc: string }) => {
    logger.info('publish idea');
    if (!(title && desc)) {
      return { status: 400, body: {} };
    }
    const id: string = shortid();
    this.commandService.requestToCreateIdea(new IdeaInfo(id, title, desc));
    return { status: 200, body: { id } };
  };
}
