import { Ivent } from '../../event';
import { IdeaEventNames } from './idea-event-names';
import { IdeaInfo } from '../idea';

export class IdeaUpdated extends Ivent {
  constructor(id: string, payload: Partial<IdeaInfo>) {
    super(IdeaEventNames.Updated, { id, ...payload });
  }
}
