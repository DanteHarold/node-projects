import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLovel } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    //*Si no existe las carpeta y/o archivos, las crea, para no hacer validaciones despues. Esto se hace una sola vez.
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, ""); //* "", Nos aseguramos que tienes permisos de escrituro, sino marca error.
      }
    );
  };

  //* LLegaremos al saveLog mediante un caso de Uso
  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);
    if (newLog.level === LogSeverityLovel.low) return;

    if (newLog.level === LogSeverityLovel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));
    return logs;
  };

  async getLogs(severityLevel: LogSeverityLovel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLovel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLovel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLovel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} not implemented!!`);
    }
  }
}
