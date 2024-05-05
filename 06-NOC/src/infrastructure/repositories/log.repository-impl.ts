import { LogEntity, LogSeverityLovel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDataSource } from "../../domain/datasources/log.datasources";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}
  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLovel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
