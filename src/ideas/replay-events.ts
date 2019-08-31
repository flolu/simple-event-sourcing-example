import { IdeaInfo } from './idea';
import { EventInfo } from '../event';
import { apply } from './apply-event';

export const replay = (initialState: IdeaInfo, events: EventInfo[]): IdeaInfo => {
  return events.reduce((previous: IdeaInfo, current: EventInfo) => {
    return apply(previous, current);
  }, initialState);
};
