import * as shortid from 'shortid';
import * as faker from 'faker';
import { Logger } from '../logger';
import { IdeaCommandHandler } from './idea-command-handler';
import { IdeaInfo } from './idea';
import { IdeaView } from './query/idea-view';

const logger = new Logger('[IdeasResource] ->');

interface HttpRequest {
  body: any;
  params: any;
}

export class IdeasApi {
  constructor(private commandHandler: IdeaCommandHandler, private queryService: IdeaView) {
    this.queryService;
  }

  publishIdea = ({ body }: HttpRequest) => {
    logger.debug('publish idea');
    const { title, desc } = body || { title: faker.lorem.words(3), desc: faker.lorem.words(7) };
    if (!(title && desc)) {
      return { status: 400, body: {} };
    }
    const id: string = shortid();
    this.commandHandler.requestToCreateIdea({ id, title, desc });
    return { status: 202, body: { id } };
  };

  editIdea = ({ body, params }: HttpRequest) => {
    logger.debug('edit idea');
    const { title, desc } = body || { title: faker.lorem.words(3), desc: faker.lorem.words(7) };
    const { id } = params;
    if (!(title || desc) || !id) {
      return { status: 400, body: {} };
    }
    this.commandHandler.editIdea(id, { title, desc });
    return { status: 202, body: { id, title, desc } };
  };

  deleteIdea = ({ params }: HttpRequest) => {
    logger.debug('delete idea');
    const { id } = params;
    if (!id) {
      return { status: 400, body: {} };
    }
    this.commandHandler.deleteIdea(id);
    return { status: 202, body: { id } };
  };

  forgetIdea = ({ params }: HttpRequest) => {
    logger.debug('forget idea');
    const { id } = params;
    if (!id) {
      return { status: 400, body: {} };
    }
    this.commandHandler.forgetIdea(id);
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

  getIdeaById = ({ params }: HttpRequest) => {
    const { id } = params;
    logger.debug('get idea by id', id);
    try {
      const idea: IdeaInfo = this.queryService.getIdeaById(id);
      return { status: 200, body: { found: idea } };
    } catch (error) {
      return { status: 500, body: { error: error.message } };
    }
  };
}
