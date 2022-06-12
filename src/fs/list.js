import { __dirname, getDir } from '../directoryPaths.js';
import { existsSync } from "fs";
import { readdir } from "fs/promises";

import { join } from "path";
import { InvalidInputError, OperationError } from '../errors.js';

export const list = async () => {
  
  try {
    const pathTofiles = join(getDir());

    if (!existsSync(pathTofiles)) throw new InvalidInputError();

    const files = await readdir(pathTofiles)
      .catch(err =>{ throw new OperationError()});

    console.log(files);
  } catch (error) {
    console.error(error);
  }
};