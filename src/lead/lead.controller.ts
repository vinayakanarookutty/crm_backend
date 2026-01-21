/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Patch, Body, Param, Req } from '@nestjs/common';
import { LeadService } from './lead.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { MoveStatusDto } from './dto/move-status.dto';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() dto: CreateLeadDto, @Req() req) {
    const userId = req.user?.id || 'system';
    return this.leadService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findById(id);
  }

  @Patch(':id/move')
  moveStatus(@Param('id') id: string, @Body() dto: MoveStatusDto, @Req() req) {
    const userId = req.user?.id || 'system';
    return this.leadService.moveStatus(id, dto, userId);
  }
}
