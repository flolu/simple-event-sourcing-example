import * as shortid from 'shortid';
import { Logger } from '../logger';
import { IdeaCommandService } from './idea-command-service';
import { IdeaInfo } from './idea';
import { IdeaView } from './idea-view';

const logger = new Logger('[IdeasResource] ->');

export class IdeasResource {
  constructor(private commandService: IdeaCommandService, private queryService: IdeaView) {
    this.queryService;
  }

  publishIdea = ({ title, desc }: { title: string; desc: string }) => {
    logger.debug('publish idea');
    if (!(title && desc)) {
      return { status: 400, body: {} };
    }
    const id: string = shortid();
    this.commandService.requestToCreateIdea({ id, title, desc });
    return { status: 202, body: { id } };
  };

  getIdeas = () => {
    logger.debug('get ideas');
    try {
      const ideas: IdeaInfo[] = this.queryService.getAllIdea();
      return { status: 200, body: { found: ideas } };
    } catch (error) {
      return { status: 500, body: { error: error.message } };
    }
  };

  getIdeaById = (id: string) => {
    logger.debug('get idea by id', id);
    try {
      const idea: IdeaInfo = this.queryService.getIdeaById(id);
      return { status: 200, body: { found: idea } };
    } catch (error) {
      return { status: 500, body: { error: error.message } };
    }
  };
}
