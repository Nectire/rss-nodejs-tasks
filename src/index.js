import {Writable} from 'stream';
import { createInterface,  } from 'readline';
import { parseArg, parseCommand } from './utils.js';
import { COMMANDS, ARGS } from './constants.js';
import { InvalidInputError, OperationError } from './errors.js';
import { createReadStream } from 'fs';
import { create } from './fs/create.js';
import { read } from './fs/read.js';
import os from 'os';
import { parse, sep } from 'path';
import {
  getArchitecture,
  getCpus,
  getSysUserName,
  getHomeDir,
  getEOL,
} from './systemInfo/systemInfo.js';



const init = () => {
  const userName = parseArg(ARGS.userName)
    .replace(`${ARGS.homeDir}=`, '');

  
  const path = `\nYou are currently in ${process.cwd()}\n`;

  function closeReadlineStream(readline) {
    process.stdout.write(`Thank you for using File Manager, ${userName}!\n`);
    readline.close();
  }

  const rl = createInterface(process.stdin, process.stdout);

  process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);

  rl.on('SIGINT', () => {
    closeReadlineStream(rl);
  });
  
  rl.on('line', (data) => {
    const command = parseCommand(data);

    if (!command) {
      process.stderr.write(new InvalidInputError().message + '\n');
    }

    if (command === '.exit') {
      closeReadlineStream(rl);
    }

    if (command === 'add') {
      const parsedLine = data.split(' ');
      create(rl, parsedLine[1]);
    }

    if (command === 'cat') {
      const parsedLine = data.split(' ');
      read(rl, parsedLine[1]);
    }

    if (command === 'os') {
      if (data.includes(ARGS.cpus)) {
        process.stdout.write(`\n${getCpus()}\n`);
      }

      if (data.includes(ARGS.userName)) {
        process.stdout.write(`\n${getSysUserName()}\n`);
      }

      if (data.includes(ARGS.arch)) {
        process.stdout.write(`\n${getArchitecture()}\n`);
      }

      if (data.includes(ARGS.homeDir)) {
        process.stdout.write(`\n${getHomeDir()}\n`);
      }

      if (data.includes(ARGS.EOL)) {
        process.stdout.write(`\n${getEOL()}\n`);
      }
    }


    // if(command === 'up') {
    //   process.chdir('../');
    //   process.stdout.write(path);
    // }

    process.stdout.write(path);
  });
}

init();
