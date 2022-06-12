import { createReadStream, createWriteStream, existsSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { createBrotliCompress } from 'zlib';
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { __dirname } from "../directoryPaths.js";

export const compress = async (pathToFile, dest) => {
  try {
    if (!pathToFile || !dest) throw new InvalidInputError();

    const pipe = promisify(pipeline);
    const input = join(__dirname, pathToFile);
    const output = join(__dirname, dest);

    if (!existsSync(input)) throw new InvalidInputError();

    await pipe(
      createReadStream(input),
      createBrotliCompress(),
      createWriteStream(output)
      );
  } catch (error) {
    console.error(error.message);
  }
}