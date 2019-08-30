import { Ivent } from '../../event';
import { IdeaInfo } from '../idea';
import { IdeaEventNames } from './idea-event-names';

export class CreateIdeaRequested extends Ivent {
  constructor(ideaInfo: IdeaInfo) {
    super(IdeaEventNames.CreateRequested, ideaInfo);
  }
}
