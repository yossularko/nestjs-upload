import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SampleDto } from './sample.dto';
import * as fs from 'fs';
import folderPath from './utils/folderPath';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(body: SampleDto, file: Express.Multer.File) {
    return {
      ...body,
      image: `/${folderPath}/${file.filename}`,
      // file: file.buffer.toString(),
    };
  }

  uploadFileSingle(body: SampleDto, file: Express.Multer.File) {
    return {
      ...body,
      image: `/${folderPath}/${file.filename}`,
    };
  }

  uploadFileArray(body: SampleDto, files: Array<Express.Multer.File>) {
    return {
      ...body,
      image: files.map((file) => `/${folderPath}/${file.filename}`).join(';'),
    };
  }

  uploadFileMultiple(
    body: SampleDto,
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    if (!files.avatar) {
      throw new BadRequestException('Avatar cannot be Empty!');
    }
    if (!files.background) {
      throw new BadRequestException('Background cannot be Empty!');
    }

    return {
      ...body,
      avatar: files.avatar
        ?.map((file) => `/${folderPath}/${file.filename}`)
        .join(';'),
      background: files.background
        ?.map((file) => `/${folderPath}/${file.filename}`)
        .join(';'),
    };
  }

  async deleteFile(filePath: string) {
    try {
      await fs.promises.unlink('./public' + filePath);
      return { message: `${filePath} was deleted` };
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err) {
        if (err.code === 'ENOENT') {
          throw new NotFoundException(`${filePath} is not found`);
        }

        throw new InternalServerErrorException(err.message);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
