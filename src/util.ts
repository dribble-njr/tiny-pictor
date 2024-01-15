import { join } from 'path';
import { readDir, stat } from './fs';

/**
 * Traverse a path and call a callback on each file.
 * It will output all files by the original structure.
 *
 * @export
 * @param {string} path
 * @param {(file: string, outputFileName: string) => Promise<boolean>} callback
 * @param {string} [relativePath='']
 * @returns {Promise<boolean[]>}
 */
export async function traversePath(
  inputPath: string,
  outputPath: string,
  callback: (file: string, outputFileName: string) => Promise<boolean>,
  relativePath = '',
): Promise<boolean[]> {
  const stats = await stat(inputPath);
  const promises = [];

  if (stats.isDirectory()) {
    // Input path is a directory
    try {
      const files = await readDir(inputPath);

      for (const file of files) {
        const filePath = join(inputPath, file);
        const fileStats = await stat(filePath);

        if (fileStats.isDirectory()) {
          // Recursively traverse nested directories
          promises.push(
            ...(await traversePath(
              filePath,
              outputPath,
              callback,
              join(relativePath, file),
            )),
          );
        } else {
          // Process individual file
          const outputFileName = join(outputPath, relativePath, file);
          promises.push(callback(filePath, outputFileName));
        }
      }
    } catch (err) {
      console.error('Error reading directory:', err);
    }
  } else {
    // Input path is a file
    const fileParts = inputPath.split('/');
    const fileName = fileParts[fileParts.length - 1];
    const outputFileName = join(outputPath, relativePath, fileName);
    promises.push(callback(inputPath, outputFileName));
  }

  return Promise.all(promises);
}
