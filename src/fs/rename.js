import {createReadStream, existsSync, rename} from "fs";
import { join } from "path";
import { getDir } from "../directoryPaths.js";
import { InvalidInputError, OperationError } from "../errors.js";


export const rename = async (path, dest) => {
  try {
    if(!path || !dest) throw new InvalidInputError();

    const input = join(getDir(), path);
    const output = join(getDir(), dest);

    if (!existsSync(input) || !existsSync(output)) {
      throw new OperationError();
    }

    const rs = createReadStream(input);
    rs.on('data', (chunk) => {
      rename(input, output, (err) => {
        if (err) throw new OperationError();
        console.log("File was successfully renamed");
      });
    });

    } catch (error) {
        console.error(error);
    }
};
