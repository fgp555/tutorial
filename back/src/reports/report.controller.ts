import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 't4_unstuffing_container[image]', maxCount: 1 },
        { name: 't5_pre_existing_damage[image]', maxCount: 1 }
      ],
      {
        storage: diskStorage({
          destination: './uploads', // Define your upload directory
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      }
    ),
  )
  async create(
    @Body() createReportDto: CreateReportDto,
    @UploadedFiles()
    files: { 
      't4_unstuffing_container[image]'?: Express.Multer.File[], 
      't5_pre_existing_damage[image]'?: Express.Multer.File[] 
    }
  ) {
    return this.reportService.create(createReportDto, files);
  } 

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
