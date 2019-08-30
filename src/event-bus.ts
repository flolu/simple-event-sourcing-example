import { EventEmitter } from 'events';
import { Ivent, IventData } from './event';
import { Logger } from './logger';

const emitter = new EventEmitter();

const logger = new Logger('[EventBus] ->');

export class EventBus {
  publish = (topic: string, event: Ivent) => {
    logger.info('emit event');
    emitter.emit(topic, event.get());
  };

  subscribe = (topic: string, cb: (data: IventData) => void): void => {
    emitter.on(topic, (data) => {
      logger.info('listened to event in topic', topic, '->', data.type);
      cb(data);
    });
  };
}
