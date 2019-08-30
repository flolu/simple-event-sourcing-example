import * as shortid from 'shortid';
import { IdeaInfo } from './idea-info';
import { IdeaCommandService } from './idea-command-service';
import { Logger } from '../logger';
import { IdeaView } from './idea-view';
import { Entities } from '../entity-interface';
import { Idea } from './idea-entities';

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
    this.commandService.requestToCreateIdea(new IdeaInfo(id, title, desc));
    return { status: 202, body: { id } };
  };

  getIdeas = () => {
    logger.debug('get ideas');
    try {
      const ideas: Entities<Idea> = this.queryService.getAllIdea();
      return { status: 200, body: { found: ideas } };
    } catch (error) {
      return { status: 500, body: { error: error.message } };
    }
  };

  getIdeaById = (id: string) => {
    logger.debug('get idea by id', id);
    try {
      const idea: Idea = this.queryService.getIdeaById(id);
      return { status: 200, body: { found: idea } };
    } catch (error) {
      return { status: 500, body: { error: error.message } };
    }
  };
}
