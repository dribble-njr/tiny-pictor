import { Command } from 'commander';
import { resizeImage } from '../sharp/resize';

export function resizeCommand(program: Command) {
  program
    .command('resize')
    .description('resize an image')
    .requiredOption('-w, --width <width>', 'width of the output image')
    .requiredOption('-h, --height <height>', 'height of the output image')
    .option('--fit <fit>', 'how the image should be resized to fit', 'cover')
    .option(
      '--position <position>',
      'position, gravity or strategy to use',
      'centre',
    )
    .option(
      '--background <background>',
      'background color when fit is contained',
      '{"r": 0, "g": 0, "b": 0, "alpha": 1}',
    )
    .option(
      '--kernel <kernel>',
      'the kernel to use for image reduction',
      'lanczos3',
    )
    .option(
      '--withoutEnlargement <withoutEnlargement>',
      'do not scale up if the dimensions are less than the target',
      false,
    )
    .option(
      '--withoutReduction <withoutReduction>',
      'do not scale down if the dimensions are greater than the target',
      false,
    )
    .option(
      '--fastShrinkOnLoad <fastShrinkOnLoad>',
      'take advantage of the JPEG and WebP shrink-on-load feature',
      true,
    )
    .action((cmd) => {
      const globalOptions = program.opts();

      resizeImage({
        inputPath: globalOptions.input,
        outputPath: globalOptions.output,
        width: Number(cmd.width),
        height: Number(cmd.height),
        fit: cmd.fit,
        position: cmd.position,
        background: JSON.parse(cmd.background),
        kernel: cmd.kernel,
        withoutEnlargement: JSON.parse(cmd.withoutEnlargement),
        withoutReduction: JSON.parse(cmd.withoutReduction),
        fastShrinkOnLoad: JSON.parse(cmd.fastShrinkOnLoad),
      });
    });
}
