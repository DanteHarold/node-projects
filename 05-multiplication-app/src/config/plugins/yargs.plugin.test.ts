//import { yarg } from "./yargs.plugin";

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./yargs.plugin");
  return yarg;
};

describe("Test args.plugin.ts", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    const yarg = await runCommand(["-b", "5"]);
    expect(yarg).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("should return configuration with custom values", async () => {
    const yarg = await runCommand([
      "-b",
      "8",
      "-l",
      "20",
      "-s",
      "-n",
      "custom-name",
      "-d",
      "custom-dir",
    ]);
    expect(yarg).toEqual(
      expect.objectContaining({
        b: 8,
        l: 20,
        s: true,
        n: "custom-name",
        d: "custom-dir",
      })
    );
  });
});
