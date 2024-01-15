import { Command } from 'commander';
import { VERSION, NAME, DESCRIPTION } from './constant';
import { compressImage } from './compress';

const program = new Command();

program.name(NAME).description(DESCRIPTION).version(VERSION);

program
  .option('-v, --version', 'output the version number')
  .option('-i, --input <inputPath>', 'input file path', '.')
  .option('-o, --output <outputPath>', 'output file path', './tiny-pictor')
  .option('-w, --width <width>', 'width of the output image')
  .option('-h, --height <height>', 'height of the output image')
  .option('-f, --format <format>', 'format of the output image');

program.parse();

const options = program.opts();

compressImage({
  inputPath: options.input,
  outputPath: options.output,
  width: options.width,
  height: options.height,
  format: options.format,
});
