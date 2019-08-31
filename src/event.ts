export interface EventInfo {
  timestamp: number;
  type: string;
  data: any;
}

export class Ivent {
  private timestamp: number;
  private type: string;
  private data: any;

  constructor(type: string, data: any) {
    this.timestamp = Date.now();
    this.type = type;
    this.data = data;
  }

  getTimestamp = () => this.timestamp;
  getType = () => this.type;
  getData = () => this.data;
  get = () => ({ timestamp: this.timestamp, type: this.type, data: this.data });
}
