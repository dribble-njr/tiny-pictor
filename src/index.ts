import { Command } from 'commander';
import { VERSION, NAME, DESCRIPTION } from './constant';
import { registerCommands } from './commands';

const program = new Command();

program.name(NAME).description(DESCRIPTION).version(VERSION);

program
  .option('-i, --input <inputPath>', 'input file path', '.')
  .option('-o, --output <outputPath>', 'output file path', './tiny-pictor');

registerCommands(program);

program.parse();
