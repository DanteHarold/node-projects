import { option, string } from "yargs";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { ServerApp } from "./server-app";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

describe("ServerAPP", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: "test-destination",
    fileName: "test-filename",
  };

  test("should create ServerApp Instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  //*Prueba de Intregación
  test("should run ServerApp with options", () => {
    // const logSpy = jest.spyOn(console, "log");
    // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    // ServerApp.run(options);
    // expect(logSpy).toHaveBeenCalledTimes(2);
    // expect(logSpy).toHaveBeenCalledWith("Server Running...");
    // expect(logSpy).toHaveBeenLastCalledWith("File Created");
    // expect(createTableSpy).toHaveBeenCalledTimes(1);
    // expect(createTableSpy).toHaveBeenCalledWith({
    //   base: options.base,
    //   limit: options.limit,
    // });
    // expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: expect.any(String),
    //   fileDestination: options.fileDestination,
    //   fileName: options.fileName,
    // });
  });

  test("should run with custom values mocked", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server Running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 2 = 2",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });

    expect(logMock).toHaveBeenCalledWith("File Created");
    expect(logMock).not.toHaveBeenCalledWith();
  });
});
