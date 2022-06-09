import {Writable} from 'stream';
import { createInterface,  } from 'readline';
import { parseArg, parseCommand } from "./utils.js";
import { COMMANDS } from './constants.js';
import { InvalidInputError, OperationError } from "./errors.js";


const init = () => {
  const userName = parseArg("--username")
    .replace("--username=", '');
  const rl = createInterface(process.stdin, process.stdout);

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

  rl.on('SIGINT', () => {
    process.stdout.write(`Thank you for using File Manager, ${userName}!\n`);
    rl.close();
  });
  
  rl.on('line', (data) => {
    console.log('daa', data);
    const command = parseCommand(data);

    if (!command) {
      process.stderr.write(new InvalidInputError().message + '\n');
    }

  });
}

init();