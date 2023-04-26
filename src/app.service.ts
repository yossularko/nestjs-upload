import { Injectable } from '@nestjs/common';
import { SampleDto } from './sample.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  uploadFile(body: SampleDto, file: Express.Multer.File) {
    return {
      ...body,
      image: file.originalname,
      file: file.buffer.toString(),
    };
  }
}
