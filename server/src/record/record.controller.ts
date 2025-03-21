import { Body, Controller, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordInvididualDto } from './record-invididual-dto/record-invididual-dto.interface';
import { RecordGroupDTO } from './recorod-group-dto/RecordGroupDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AdminGuard } from 'src/guard/admin.guard';

@Controller('/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post("/createInvididualRecord")
  @HttpCode(200)
  async createInvididualRecord(@Body() body:RecordInvididualDto){
    const result = await this.recordService.createInvididualRecord(body)
    return result
  }


  @Post("/createGroupRecord")
  @UseInterceptors(FileInterceptor('fileList', {
    storage: diskStorage({
      destination: './uploads'
      , filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
      }
    })
  }))
  @HttpCode(200)
  async createGroupRecord(@Body() body:RecordGroupDTO,@UploadedFile() file: Express.Multer.File){
    const result = await this.recordService.createGroupRecord(body,file)
    return result
  }

  @UseGuards(AdminGuard)
  @Get("/getRecords")
  async getRecords(){
    const result = await this.recordService.getRecords()
    return result
  }
}
