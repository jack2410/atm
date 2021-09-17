import { Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { AtmService } from '../atm-service';

@Controller('atms')
export class AtmControllerController {
  constructor(private readonly service: AtmService) {}

  @Get()
  getAtms() {
    return this.service.getAtms();
  }

  @Delete(':id')
  async removeAtm(@Param('id') id: string) {
    return await this.service.removeAtm(id);
  }

  @Get('queue')
  async getQueue() {
    return await this.service.getQueue();
  }

  @Post()
  async addAtm() {
    return this.service.addAtm();
  }
}
