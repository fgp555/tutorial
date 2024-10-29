import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto, files: {
        't4_unstuffing_container[image]'?: Express.Multer.File[];
        't5_pre_existing_damage[image]'?: Express.Multer.File[];
    }): Promise<import("./entities/report.entity").Report>;
    findAll(): Promise<import("./entities/report.entity").Report[]>;
    findOne(id: string): Promise<import("./entities/report.entity").Report>;
    update(id: string, updateReportDto: UpdateReportDto): Promise<import("./entities/report.entity").Report>;
    remove(id: string): Promise<void>;
}
