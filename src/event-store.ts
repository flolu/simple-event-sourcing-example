// @ts-ignore
import * as eventstore from 'eventstore';
import { Ivent } from './event';
import { EventProducer } from './ideas/event-producer';

export class EventStore {
  private es = eventstore();

  constructor(private eventProducer: EventProducer) {}

  addEvent = async (streamId: string, event: Ivent) => {
    const stream: any = await this.getStream(streamId);
    stream.addEvent(event.get());
    stream.commit((err: any) => {
      if (err) {
        throw err;
      }
      this.eventProducer.publish(event);
    });
  };

  private getStream = (streamId: string) => {
    return new Promise((resolve, reject) => {
      this.es.getEventStream(streamId, (err: any, stream: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(stream);
      });
    });
  };
}
