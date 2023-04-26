import { Request } from 'express';

export class Helper {
  static customFileName(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    let fileExtension = '';
    if (file.mimetype.indexOf('jpeg') > -1) {
      fileExtension = 'jpg';
    } else if (file.mimetype.indexOf('png') > -1) {
      fileExtension = 'png';
    }
    const originalName = file.originalname.split('.')[0];
    callback(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
  }

  static destinationPath(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) {
    callback(null, './public/');
  }
}
