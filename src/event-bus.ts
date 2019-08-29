import { EventEmitter } from 'events';
import { Ivent, IventData } from './event';

const emitter = new EventEmitter();

export class EventBus {
  publish = (topic: string, event: Ivent) => {
    emitter.emit(topic, event.get());
  };

  subscribe = (topic: string, cb: (data: IventData) => void): void => {
    emitter.on(topic, (data) => {
      cb(data);
    });
  };
}
