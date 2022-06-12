
import os from 'os';

export const getCpus = () => {
  return os.cpus().map((cpu) => {
    return `Model: ${cpu.model}\nspeed: ${cpu.speed.toString().slice(0, 1)} GHz`;
    }).join('\n') + `\ntotal cores (threads): ${os.cpus().length}`;
}

export const getSysUserName = () => os.userInfo().username;

export const getArchitecture = () => os.arch();

export const getHomeDir = () => os.homedir();

export const getEOL = () =>'EOL: ' + JSON.stringify(os.EOL);