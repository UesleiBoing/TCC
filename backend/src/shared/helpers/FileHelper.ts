import fs from 'fs';

/**
 * @class FileHelper - Helper to handle file operations.
 */
export default class FileHelper {

  /**
     * Delete files from disk.
     * @param filename = File name.
     * @returns void.
     */
  public static async deleteFile(filename: string): Promise<void> {
    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }
    await fs.promises.unlink(filename);
  }

}
