import { writeFile, existsSync, createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { OperationError } from "../errors.js";
import { __dirname } from "../directoryPaths.js";

export const create = async (rl, path, data) => {
  try {
    const filePath = join(__dirname, path);

    if (existsSync(filePath)) throw new OperationError();

    writeFile(filePath, 'hello', (err) => {
      if (err) throw new OperationError();
      console.log("File was successfully created");
    });
  } catch (error) {
    console.error(error.message);
  }
};
