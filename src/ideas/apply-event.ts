import { IdeaInfo } from './idea';
import { EventInfo } from '../event';
import { IdeaEventNames } from './events';

export const apply = (state: IdeaInfo, event: EventInfo): IdeaInfo => {
  switch (event.type) {
    case IdeaEventNames.CreateRequested:
      return {
        ...state,
        id: event.data.id,
        title: event.data.title,
        desc: event.data.desc,
        created: false,
        deleted: false,
      };
    case IdeaEventNames.CreateAccepted:
      return { ...state, created: true };
    case IdeaEventNames.CreateRejected:
      return { ...state, created: false };
    case IdeaEventNames.Updated:
      return { ...state, title: event.data.title || state.title, desc: event.data.desc || state.desc };
    case IdeaEventNames.Deleted:
      return { ...state, deleted: true };
    default:
      return { ...state };
  }
};
