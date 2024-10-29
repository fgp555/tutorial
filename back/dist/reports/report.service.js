"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const report_entity_1 = require("./entities/report.entity");
let ReportService = class ReportService {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async create(createReportDto, files) {
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
        const report = this.reportRepository.create(createReportDto);
        return await this.reportRepository.save(report);
    }
    async findAll() {
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
    async findOne(id) {
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
    async update(id, updateReportDto) {
        await this.reportRepository.update(id, updateReportDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.reportRepository.delete(id);
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.Report)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReportService);
//# sourceMappingURL=report.service.js.map