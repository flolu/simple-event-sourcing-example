import { Ivent } from '../../event';
import { IdeaEventNames } from './idea-event-names';

export class IdeaTombstone extends Ivent {
  constructor(id: string) {
    super(IdeaEventNames.Tombstone, { id });
  }
}
