import { IdeaInfo } from './idea';
import { EventInfo } from '../event';
import { IdeaEventNames } from './events';

export const apply = (state: IdeaInfo, event: EventInfo): IdeaInfo => {
  let updated: IdeaInfo = { ...state, lastEventId: event.id };
  switch (event.type) {
    case IdeaEventNames.CreateRequested:
      return {
        ...updated,
        id: event.data.id,
        title: event.data.title,
        desc: event.data.desc,
        created: false,
        deleted: false,
      };
    case IdeaEventNames.CreateAccepted:
      return { ...updated, created: true };
    case IdeaEventNames.CreateRejected:
      return { ...updated, created: false };
    case IdeaEventNames.Updated:
      return { ...updated, title: event.data.title || state.title, desc: event.data.desc || state.desc };
    case IdeaEventNames.Deleted:
      return { ...updated, deleted: true };
    default:
      return { ...updated };
  }
};
