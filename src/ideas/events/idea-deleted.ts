import { Ivent } from '../../event';
import { IdeaEventNames } from './idea-event-names';

export class IdeaDeleted extends Ivent {
  constructor(id: string) {
    super(IdeaEventNames.Deleted, { id });
  }
}
