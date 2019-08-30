import { Ivent } from '../../event';
import { IdeaInfo } from '../idea';
import { IdeaEventNames } from './idea-event-names';

export class CreateIdeaAccepted extends Ivent {
  constructor(idea: IdeaInfo) {
    super(IdeaEventNames.CreateAccepted, idea);
  }
}
