import { Command } from 'commander';
import { VERSION, NAME, DESCRIPTION } from './constant';
import { resizeImage } from './resize';

const program = new Command();

program.name(NAME).description(DESCRIPTION).version(VERSION);

program
  .option('-i, --input <inputPath>', 'input file path', '.')
  .option('-o, --output <outputPath>', 'output file path', './tiny-pictor');

program
  .command('resize')
  .description('resize an image')
  .option('-w, --width <width>', 'width of the output image')
  .option('-h, --height <height>', 'height of the output image')
  .action((cmd) => {
    const globalOptions = program.opts();

    resizeImage({
      inputPath: globalOptions.input,
      outputPath: globalOptions.output,
      width: cmd.width,
      height: cmd.height,
    });
  });

program.configureHelp({
  showGlobalOptions: true,
});

program.parse();
