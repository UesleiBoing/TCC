import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

export default {
  upload(folder: string): multer.Options {
    return {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
      fileFilter: (request, file, callback) => {
        const allowedMimes = ['image/png', 'image/jpg', 'image/jpeg'];

        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    };
  },

};
