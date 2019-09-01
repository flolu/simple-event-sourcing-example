import { Ivent, EventInfo } from './event';
import { EventProducer } from './ideas/event-producer';
import { Entities } from './entity-interface';
import { replay } from './ideas/replay-events';
import { Idea, IdeaInfo } from './ideas/idea';
import { Logger } from './logger';

const logger = new Logger('[EventStore] ->');

// FIXME multiple aggregates in one stream?
export class EventStore {
  private streams: Entities<EventInfo[]> = {};
  private snapshots: Entities<IdeaInfo[]> = {};
  private readonly maxSnapshotsToKeep: number = 3;
  private readonly minNumberOfEventsToCreateSnapshot: number = 10;

  constructor(private eventProducer: EventProducer) {}

  // FIXME change to add multiple events
  addEvent = async (streamId: string, event: Ivent, lastEventId: string) => {
    if (!this.streams[streamId]) {
      throw new Error(`stream with id: ${streamId} does not exist`);
    }
    const lastEvent = this.getLastEventFromStream(streamId);
    if (lastEvent.id !== lastEventId) {
      throw new Error('cannot perform command because a newer version exists');
    }
    this.streams[streamId] = [...this.streams[streamId], event.get()];
    if (this.streams[streamId].length % this.minNumberOfEventsToCreateSnapshot === 0) {
      this.saveSnapshot(streamId);
    }
    this.eventProducer.publish(event);
    logger.debug('added event', event);
  };

  createStream = (streamId: string, event: Ivent) => {
    if (this.streams[streamId]) {
      throw new Error(`tried to create stream with id: ${streamId}, but it already exists`);
    }
    this.streams[streamId] = [event.get()];
    this.eventProducer.publish(event);
    logger.debug('created stream with event', event);
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

  clearStream = (streamId: string, tombstoneEvent: Ivent, lastEventId: string): void => {
    logger.debug('clear stream', streamId);
    const lastEvent = this.getLastEventFromStream(streamId);
    if (lastEvent.id !== lastEventId) {
      throw new Error('cannot perform command because a newer version exists');
    }
    this.streams[streamId] = [];
    this.snapshots[streamId] = [];
    this.eventProducer.publish(tombstoneEvent);
  };

  private getLastEventFromStream = (streamId: string): EventInfo =>
    this.streams[streamId][this.streams[streamId].length - 1];

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
