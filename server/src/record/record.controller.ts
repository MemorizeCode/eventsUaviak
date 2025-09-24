import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordInvididualDto } from './record-invididual-dto/record-invididual-dto.interface';
import { RecordGroupDTO } from './recorod-group-dto/RecordGroupDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { AdminGuard } from 'src/guard/admin.guard';
import { createReadStream, existsSync } from 'fs';
import { Response } from 'express';
@Controller('/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}
  
  @Get('/downloadList/:url')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  )
  @Header('Content-Disposition', 'attachment; filename="document.docx"')
  async downloadFile(@Res() res: Response, @Param() param) {
    try {
      const { url } = param;
      const filePath = join(process.cwd(), 'uploads', url);

      if (!existsSync(filePath)) {
        throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
      }

      const fileStream = createReadStream(filePath);

      fileStream.on('error', (error) => {
        if (!res.headersSent) {
          throw new HttpException(
            'Ошибка при скачивании файла',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      });
      fileStream.pipe(res);
    } catch (error) {
      console.error('Download error:', error);
      if (!res.headersSent) {
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(
          'Ошибка при скачивании файла',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Post('/createInvididualRecord')
  @HttpCode(200)
  async createInvididualRecord(@Body() body: RecordInvididualDto) {
    const result = await this.recordService.createInvididualRecord(body);
    return result;
  }

  //сделай проверку на тип файла
  @Post('/createGroupRecord')
  @UseInterceptors(
    FileInterceptor('fileList', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          const fileType = file.mimetype.split('/')[1];
          if(fileType !== 'vnd.openxmlformats-officedocument.wordprocessingml.document'){
            throw new HttpException('Не верный тип файла', HttpStatus.BAD_REQUEST);
          }
          cb(null, `${file.originalname}-${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @HttpCode(200)
  async createGroupRecord(
    @Body() body: RecordGroupDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.recordService.createGroupRecord(body, file);
    return result;
  }

  @UseGuards(AdminGuard)
  @Get('/getRecords')
  async getRecords() {
    const result = await this.recordService.getRecords();
    return result;
  }
}
