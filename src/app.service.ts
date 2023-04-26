import { BadRequestException, Injectable } from '@nestjs/common';
import { SampleDto } from './sample.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(body: SampleDto, file: Express.Multer.File) {
    return {
      ...body,
      image: file.filename,
      // file: file.buffer.toString(),
    };
  }

  uploadFileSingle(body: SampleDto, file: Express.Multer.File) {
    return {
      ...body,
      image: file.filename,
    };
  }

  uploadFileArray(body: SampleDto, files: Array<Express.Multer.File>) {
    return {
      ...body,
      image: files.map((file) => file.filename).join(';'),
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
      avatar: files.avatar?.map((file) => file.filename).join(';'),
      background: files.background?.map((file) => file.filename).join(';'),
    };
  }
}
