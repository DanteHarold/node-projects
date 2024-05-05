import { LogEntity, LogSeverityLovel } from "../entities/log.entity";

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLovel): Promise<LogEntity[]>;
}
