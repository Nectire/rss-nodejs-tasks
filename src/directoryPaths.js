import { join } from "path";
import {homedir} from 'os';

let __dirname = '';

export const setDir = (path) => {
  __dirname =  path ? join(homedir(), path) : homedir();
}

export const getDir = () => __dirname;