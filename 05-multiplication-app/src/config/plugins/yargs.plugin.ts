import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .options("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Multiplication table Base",
  })
  .options("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Multiplication table Limit",
  })
  .options("s", {
    alias: "showTable",
    type: "boolean",
    default: false,
    describe: "Show Multiplication table",
  })
  .options("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File Name",
  })
  .options("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "File Destination",
  })
  .check((argv, options) => {
    if (argv.b < 1) throw new Error("Error: Base must be greater than 0");
    return true;
  })
  .parseSync();
