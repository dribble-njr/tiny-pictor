import sharp from "sharp";
import { mkdirP, pathExists } from "./fs";
import { Options } from "./types";

/**
 * compress image by options
 * @param option Options
 */
export const compressImage = async (options: Options) => {
  console.log("Input Path:", options.inputPath);
  console.log("Output Path:", options.outputPath);
  console.log("Width:", options.width);
  console.log("Height:", options.height);
  console.log("Format:", options.format);
  const { inputPath, width, height, format, outputPath } = options;

  const inputPathExist = await pathExists(inputPath);
  const outputPathExist = await pathExists(outputPath);

  if (!inputPathExist) {
    console.error("Input path does not exist:", inputPath);
    return;
  }

  if (!outputPathExist) {
    mkdirP(outputPath);
  }

  sharp(inputPath)
    .resize(Number(width), Number(height))
    // .toFormat(format)
    .toFile(outputPath + 1, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Image processed successfully:", info);
      }
    });
};
