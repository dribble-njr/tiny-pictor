import sharp from 'sharp';
import { dirname } from 'path';
import { mkdirP, pathExists } from './fs';
import { ResizeOptions } from './types';
import { traversePath } from './util';

/**
 * resize image by options
 *
 * @param option Options
 */
export const resizeImage = async (options: ResizeOptions) => {
  const { inputPath, width, height, outputPath } = options;
  console.log('Input Path:', inputPath);
  console.log('Output Path:', outputPath);
  console.log('Width:', width);
  console.log('Height:', height);

  const inputPathExist = await pathExists(inputPath);
  const outputPathExist = await pathExists(outputPath);

  if (!inputPathExist) {
    console.error('Input path does not exist:', inputPath);
    return;
  }

  if (!outputPathExist) {
    mkdirP(outputPath);
  }

  const callback = async (file: string, outputFileName: string) => {
    try {
      await mkdirP(dirname(outputFileName));
      await sharp(file)
        .resize({ width: Number(width), height: Number(height) })
        .toFile(outputFileName);
      console.log('Image processed successfully:', outputFileName);
      return true;
    } catch (err) {
      console.error('Error processing image:', file, err);
      return false;
    }
  };

  traversePath(inputPath, outputPath, callback);
};
