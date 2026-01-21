import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead } from './lead.schema';
import { CreateLeadDto } from './dto/create-lead.dto';
import { MoveStatusDto } from './dto/move-status.dto';
import { LeadStatus } from './lead-status.enum';

const StatusFieldRules = {
  Contacted: ['email'],
  Qualified: ['destination', 'travelStartDate', 'travelEndDate'],
  'Proposal Sent': ['quotationId'],
  Won: ['bookingId'],
  Lost: ['lossReason'],
};

@Injectable()
export class LeadService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<Lead>) {}

  async create(dto: CreateLeadDto, userId: string) {
    const lead = new this.leadModel({
      ...dto,
      status: LeadStatus.NEW,
      history: [{ action: 'Lead Created', user: userId, date: new Date() }],
    });
    return lead.save();
  }

  async findAll() {
    return this.leadModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    const lead = await this.leadModel.findById(id);
    if (!lead) throw new NotFoundException('Lead not found');
    return lead;
  }

  async moveStatus(id: string, dto: MoveStatusDto, userId: string) {
    const lead = await this.leadModel.findById(id);
    if (!lead) throw new NotFoundException('Lead not found');

    const requiredFields = StatusFieldRules[dto.status] || [];

    for (const field of requiredFields) {
      if (!dto[field]) {
        throw new BadRequestException(
          `Field "${field}" is required to move to ${dto.status}`,
        );
      }
    }

    Object.assign(lead, dto);
    lead.status = dto.status;

    lead.history.push({
      action: `Moved to ${dto.status}`,
      user: userId,
      date: new Date(),
    });

    return lead.save();
  }
}
