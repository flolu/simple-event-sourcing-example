import { Ivent, EventInfo } from './event';
import { EventProducer } from './ideas/event-producer';
import { Entities } from './entity-interface';
import { replay } from './ideas/replay-events';
import { Idea, IdeaInfo } from './ideas/idea';
import { Logger } from './logger';

const logger = new Logger('[EventStore] ->');

// FIXME create generic eventstore that can be extended
export class EventStore {
  private streams: Entities<EventInfo[]> = {};
  private snapshots: Entities<IdeaInfo[]> = {};
  private readonly maxSnapshotsToKeep: number = 3;
  private readonly minNumberOfEventsToCreateSnapshot: number = 10;

  constructor(private eventProducer: EventProducer) {}

  addEvent = async (streamId: string, event: Ivent) => {
    if (!this.streams[streamId]) {
      this.streams[streamId] = [];
    }
    this.streams[streamId] = [...this.streams[streamId], event.get()];
    if (this.streams[streamId].length % this.minNumberOfEventsToCreateSnapshot === 0) {
      this.saveSnapshot(streamId);
    }
    this.eventProducer.publish(event);
    logger.debug('added event', event);
  };

  getCurrentAggregate = (streamId: string): IdeaInfo => {
    const snapshot = this.getLatestSnapshot(streamId);
    logger.debug('get current aggregate of', streamId);
    if (snapshot) {
      logger.debug('get aggregate from snapshot');
      return replay(snapshot, this.getStreamAfterSnapshot(streamId, snapshot.lastEventId));
    } else {
      logger.debug('get aggregate from the beginning of events');
      return replay(new Idea().getInfo(), this.getStream(streamId));
    }
  };

  clearStream = (streamId: string, tombstoneEvent: Ivent): void => {
    logger.debug('clear stream', streamId);
    this.streams[streamId] = [];
    this.snapshots[streamId] = [];
    this.addEvent(streamId, tombstoneEvent);
  };

  private getStreamAfterSnapshot = (streamId: string, lastEventId: string): EventInfo[] => {
    return this.streams[streamId].slice(this.streams[streamId].map((e) => e.id).indexOf(lastEventId));
  };

  private getStream = (streamId: string): EventInfo[] => {
    return this.streams[streamId] || [];
  };

  private getLatestSnapshot = (streamId: string) => {
    if (this.snapshots[streamId] && this.snapshots[streamId].length) {
      return this.snapshots[streamId][this.snapshots[streamId].length - 1];
    } else {
      return null;
    }
  };

  private saveSnapshot = (streamId: string) => {
    const snapshot = this.getCurrentAggregate(streamId);
    if (!this.snapshots[streamId]) {
      logger.debug('create first snapshot for', streamId);
      this.snapshots[streamId] = [];
    }
    this.snapshots[streamId] = [...this.snapshots[streamId], snapshot];
    if (this.snapshots[streamId].length > this.maxSnapshotsToKeep) {
      this.snapshots[streamId].shift();
    }
    logger.debug('saved snapshot', streamId);
  };
}
