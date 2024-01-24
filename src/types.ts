import { ResizeOptions as SharpResizeOptions } from 'sharp';

export interface BasicOptions {
  inputPath: string;
  outputPath: string;
}

export type ResizeOptions = SharpResizeOptions & BasicOptions;
