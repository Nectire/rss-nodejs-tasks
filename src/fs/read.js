import { existsSync, createReadStream} from "fs";
import { join } from "path";
import { OperationError } from "../errors.js";
import { getDir } from "../directoryPaths.js";
import { pipeline } from "stream";

export const read = async (rl, path) => {
  
  try {
    if (!path) throw new OperationError();

    const readPath = join(getDir(), path);
    if (!existsSync(readPath)) {
      throw new OperationError();
    }

    pipeline(
      createReadStream(readPath),
        process.stdout,
        (err) => {
          if (err) throw OperationError();
          process.stdout.write('\n');
        }
      );

    } catch (error) {
      console.error(error.message);
    }
};