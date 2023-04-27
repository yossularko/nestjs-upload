import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { AppService } from './app.service';
import { SampleDto } from './sample.dto';
import { fileType } from './utils/fileTypeRegExp';
import { maxSize } from './utils/maxSize';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body: SampleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.appService.uploadFile(body, file);
  }

  @Post('file/single')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileSingle(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType })
        .addMaxSizeValidator({ maxSize })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.appService.uploadFileSingle(body, file);
  }

  @Post('file/array')
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadFileArray(
    @Body() body: SampleDto,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType })
        .addMaxSizeValidator({ maxSize })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.appService.uploadFileArray(body, files);
  }

  @Post('file/multiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  uploadFileMultiple(
    @Body() body: SampleDto,
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background?: Express.Multer.File[];
    },
  ) {
    return this.appService.uploadFileMultiple(body, files);
  }

  @Delete(`file/:filePath`)
  deleteFile(@Param('filePath') filePath: string) {
    return this.appService.deleteFile(filePath);
  }
}
