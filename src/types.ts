import { ResizeOptions as SharpResizeOptions } from 'sharp';

export interface BasicOptions {
  inputPath: string;
  outputPath: string;
}

export interface ResizeOptions extends SharpResizeOptions, BasicOptions {}
