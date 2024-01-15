import { promises as fsPromises, constants, Stats } from 'fs';
import { dirname } from 'path';

export async function mkdirP(src: string): Promise<void> {
  console.log(`mkdir -p ${src}`);
  await fsPromises.mkdir(src, { recursive: true });
}

export async function copy(src: string, target: string): Promise<void> {
  await mkdirP(dirname(target));
  await fsPromises.copyFile(src, target);
}

export async function pathExists(src: string): Promise<boolean> {
  try {
    await fsPromises.access(src, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

export async function remove(src: string): Promise<void> {
  console.log(`rm -rf ${src}`);
  await fsPromises.rm(src, { recursive: true, force: true });
}

export async function stat(src: string): Promise<Stats> {
  console.log(`fs.stat(${src})`);
  return await fsPromises.stat(src);
}

export async function readDir(src: string): Promise<string[]> {
  return await fsPromises.readdir(src);
}
