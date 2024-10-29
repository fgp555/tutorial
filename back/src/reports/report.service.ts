import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async create(
    createReportDto: CreateReportDto,
    files: { 
      't4_unstuffing_container[image]'?: Express.Multer.File[], 
      't5_pre_existing_damage[image]'?: Express.Multer.File[] 
    }
  ): Promise<Report> {
    // Attach file paths to the DTO only if files are present and defined
    if (files['t4_unstuffing_container[image]'] && files['t4_unstuffing_container[image]'].length > 0) {
      createReportDto.t4_unstuffing_container = {
        ...createReportDto.t4_unstuffing_container,
        images: [
          {
            path: files['t4_unstuffing_container[image]'][0].path,
            description: createReportDto.t4_unstuffing_container?.images?.[0]?.description || 'No description provided',
          },
        ],
      };
    }
  
    if (files['t5_pre_existing_damage[image]'] && files['t5_pre_existing_damage[image]'].length > 0 && createReportDto.t5_pre_existing_damage?.damages) {
      // Ensure `damages` exists in DTO and that it contains an array of damage entries
      createReportDto.t5_pre_existing_damage.damages = createReportDto.t5_pre_existing_damage.damages.map((damage, index) => {
        const imageFile = files['t5_pre_existing_damage[image]']?.[index];
        if (imageFile) {
          damage.images = damage.images || [];
          damage.images.push({
            path: imageFile.path,
            description: damage.images?.[0]?.description || 'No description provided',
          });
        }
        return damage;
      });
    }
  
    // Create and save the Report entity with the updated DTO
    const report = this.reportRepository.create(createReportDto);
    return await this.reportRepository.save(report);
  }
  
  
  

  async findAll(): Promise<Report[]> {
    return await this.reportRepository.find({
      relations: [
        't0_header',
        't1_details_shipment',
        'T2_relevant_times',
        't3_securing_seals',
        't4_unstuffing_container',
        't5_pre_existing_damage',
        't6_the_weather',
        't7_footer',
      ],
    });
  }

  async findOne(id: number): Promise<Report> {
    return await this.reportRepository.findOne({
      where: { id },
      relations: [
        't0_header',
        't1_details_shipment',
        'T2_relevant_times',
        't3_securing_seals',
        't4_unstuffing_container',
        't5_pre_existing_damage',
        't6_the_weather',
        't7_footer',
      ],
    });
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    await this.reportRepository.update(id, updateReportDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reportRepository.delete(id);
  }
}
