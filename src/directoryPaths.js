import { join } from "path";
import {homedir} from 'os';

let __dirname = '';

export const setDir = (path) => {
  __dirname =  path ? join(path) : homedir();
}

export const getDir = () => __dirname;