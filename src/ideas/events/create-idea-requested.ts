import { Ivent } from '../../event';
import { CreateIdeaPayload } from '../idea';
import { IdeaEventNames } from './idea-event-names';

export class CreateIdeaRequested extends Ivent {
  constructor(ideaInfo: CreateIdeaPayload) {
    super(IdeaEventNames.CreateRequested, ideaInfo);
  }
}
