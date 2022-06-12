import { createReadStream, createWriteStream, existsSync } from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { createBrotliDecompress } from "zlib";
import { join } from "path";

import { InvalidInputError, OperationError } from "../errors.js";
import { __dirname } from "../directoryPaths.js";

export const decompress = async (pathToFile, dest) => {
  try {
    if (!pathToFile || !dest) throw new InvalidInputError();

    const pipe = promisify(pipeline);
    const input = join(__dirname, pathToFile);
    const output = join(__dirname, dest);

    if (!existsSync(input)) throw new InvalidInputError();

    await pipe(
      createReadStream(input),
    createBrotliDecompress(),
    createWriteStream(output)
    );
  } catch (error) {
    console.error(error.message);
  }
};
