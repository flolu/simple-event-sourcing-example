import { EventEmitter } from 'events';
import { Ivent } from './ideas/idea-entities';

const emitter = new EventEmitter();

export class EventBus {
  publish = (topic: string, event: Ivent) => {
    emitter.emit(topic, event.get());
  };

  subscribe = (topic: string, cb: (data: any) => void): void => {
    emitter.on(topic, (data) => {
      cb(data);
    });
  };
}
