import { Ivent, EventInfo } from './event';
import { EventProducer } from './ideas/event-producer';
import { Entities } from './entity-interface';

export class EventStore {
  private streams: Entities<EventInfo[]> = {};

  constructor(private eventProducer: EventProducer) {}

  // TODO pass in event info instead
  addEvent = async (streamId: string, event: Ivent) => {
    if (!this.streams[streamId]) {
      this.streams[streamId] = [];
    }
    this.streams[streamId] = [...this.streams[streamId], event.get()];
    this.eventProducer.publish(event);
  };

  // TODO handle stream not existing
  public getStream = (streamId: string): EventInfo[] => {
    return this.streams[streamId];
  };
}
