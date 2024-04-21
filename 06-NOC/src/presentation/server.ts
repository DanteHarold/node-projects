import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("Server Started...");
    CronService.createJob("*/5 * * * * *", () => {
      //   new CheckService().execute("https://google.com");
      const url = "https://google.com";
      new CheckService(
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
Server.start();