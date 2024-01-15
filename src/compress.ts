import sharp from 'sharp';
import { mkdirP, pathExists } from './fs';
import { Options } from './types';
import { traversePath } from './util';

/**
 * compress image by options
 *
 * @param option Options
 */
export const compressImage = async (options: Options) => {
  const { inputPath, width, height, format, outputPath } = options;
  console.log('Input Path:', inputPath);
  console.log('Output Path:', outputPath);
  console.log('Width:', width);
  console.log('Height:', height);
  console.log('Format:', format);

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
      await sharp(file)
        .resize(Number(width), Number(height))
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
