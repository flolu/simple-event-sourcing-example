import shortid = require('shortid');

export interface EventInfo {
  id: string;
  timestamp: number;
  type: string;
  data: any;
}

export class Ivent {
  private timestamp: number;
  private type: string;
  private data: any;
  private id: string;

  constructor(type: string, data: any) {
    this.timestamp = Date.now();
    this.type = type;
    this.data = data;
    this.id = shortid();
  }

  get = (): EventInfo => ({ timestamp: this.timestamp, type: this.type, data: this.data, id: this.id });
  getTimestamp = () => this.timestamp;
  getType = () => this.type;
  getData = () => this.data;
  getId = () => this.id;
}
