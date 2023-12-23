import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

console.log(yarg);

let outputMessage = "";

const base = yarg.b;

const headerMessage = `
Tabla del ${base}
`;

for (let i = 0; i <= yarg.l; i++) {
  outputMessage += `${base} X ${i} = ${base * i}\n`;
}

outputMessage = headerMessage + outputMessage;

if (yarg.s) console.log(outputMessage);

const outputPath = `outputs`;

fs.mkdirSync(outputPath, { recursive: true });

fs.writeFileSync(`${outputPath}/tabla-${base},txt`, outputMessage);
