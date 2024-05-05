export enum LogSeverityLovel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLovel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLovel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }

  // "{"level":"high", "message": "Hola Mundo", "createdAt" : "13456789"}"
  //* Método creado para devolver instancias a partir de ese JSON STRING
  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  };
}
