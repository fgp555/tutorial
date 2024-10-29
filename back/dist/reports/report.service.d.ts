import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportService {
    private readonly reportRepository;
    constructor(reportRepository: Repository<Report>);
    create(createReportDto: CreateReportDto, files: {
        't4_unstuffing_container[image]'?: Express.Multer.File[];
        't5_pre_existing_damage[image]'?: Express.Multer.File[];
    }): Promise<Report>;
    findAll(): Promise<Report[]>;
    findOne(id: number): Promise<Report>;
    update(id: number, updateReportDto: UpdateReportDto): Promise<Report>;
    remove(id: number): Promise<void>;
}
