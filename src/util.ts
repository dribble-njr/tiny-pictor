import { readDir, stat } from './fs';

/**
 * Traverse a path and call a callback on each file.
 *
 * @export
 * @param {string} path
 * @param {(file: string, outputFileName: string) => Promise<boolean>} callback
 * @returns
 */
export async function traversePath(
  inputPath: string,
  outputPath: string,
  callback: (file: string, outputFileName: string) => Promise<boolean>,
): Promise<boolean[]> {
  const stats = await stat(inputPath);
  const promises = [];

  if (stats.isDirectory()) {
    // Input path is a directory
    try {
      const files = await readDir(inputPath);

      for (const file of files) {
        const filePath = `${inputPath}/${file}`;
        const fileStats = await stat(filePath);

        if (fileStats.isDirectory()) {
          // Recursively traverse nested directories
          promises.push(
            ...(await traversePath(filePath, outputPath, callback)),
          );
        } else {
          // Process individual file
          promises.push(callback(filePath, file));
        }
      }
    } catch (err) {
      console.error('Error reading directory:', err);
    }
  } else {
    // Input path is a file
    promises.push(callback(inputPath, '1'));
  }

  return Promise.all(promises);
}
