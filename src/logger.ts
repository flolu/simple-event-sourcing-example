import * as pino from 'pino';

export class Logger {
  private logger: pino.Logger;

  constructor(private prefix: string = '', prettyPrint: boolean = true, level: string = process.env.LEVEL || 'info') {
    const options: pino.LoggerOptions = { prettyPrint, level };
    this.logger = pino(options);
    this.debug('logger initialized', options);
  }

  public info = (message: string, ...args: any[]) => {
    this.logger.info(this._prefix, message, ...args);
  };

  public debug = (message: string, ...args: any[]) => {
    this.logger.debug(this._prefix, message, ...args);
  };

  public warn = (message: string, ...args: any[]) => {
    this.logger.warn(message, this._prefix, ...args);
  };

  public error = (message: string, ...args: any[]) => {
    this.logger.error(this._prefix, message, ...args);
  };

  private get _prefix(): string {
    return this.prefix + ' ';
  }
}
